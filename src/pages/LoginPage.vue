<script setup lang="ts">
import Input from '../components/Input/Input.vue';
import Button from '../components/Button.vue';
import * as authService from '../services/auth.service';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { routesName } from '../router';
import { joinRoomShopWaiter } from '../socket/waiter.socket';
import roleName from '../config/roleName';
import { joinRoomShopChef } from '../socket/chef.socket';
import { joinRoomShopManager } from '../socket/manager.socket';

import { joinRoomSocket } from '../socket/utils.socket';

const store = useStore();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

function setEmail(value: string) {
    email.value = value;
}

function setPassword(value: string) {
    password.value = value;
}

async function handleLogin() {
    try {
        if (email.value.trim() != '' && password.value.trim() != '') {
            const userLogin = await authService.login(email.value, password.value);

            if (userLogin) {
                await store.dispatch('setUser', userLogin);

                console.log('login.vue 1');

                const role = store.getters['userRole'];
                const userId = store.getters['userId'];
                const shopId = store.getters['shopId'];

                if (userLogin.role.name == roleName.WAITER) {
                    router.push({ path: `/${userLogin?.shop.name}/waiter` });
                    document.title = `${store.getters['shopName']} - ${role}`;
                } else if (userLogin.role.name == roleName.CHEF) {
                    document.title = `${store.getters['shopName']} - ${role}`;
                    router.push({ path: `/${userLogin?.shop.name}/chef` });
                } else if (userLogin.role.name == roleName.MANAGER) {
                    router.push({ path: `/${userLogin?.shop.name}` });
                    document.title = `${store.getters['shopName']} - ${role}`;
                } else {
                    router.push({ path: `/${userLogin?.shop.name}` });
                    document.title = `${store.getters['shopName']} `;
                }

                joinRoomSocket(userLogin);

                await store.dispatch('fetchNotify', store.getters['userId']);

                console.log('login.vue 2');
            }
        }
    } catch (error) {
        console.log(`file: LoginPage.vue:17 > error:`, error);
    }
}
</script>

<template>
    <div class="background__wrapper">
        <div class="login__wrapper">
            <form class="login__form" @submit.prevent="handleLogin">
                <Input :title="'Email / Phone number'" @on-change="setEmail" class="input" />
                <Input :title="'Password'" :type="'password'" @on-change="setPassword" class="input" />

                <Button primary class="login-btn">Login</Button>
            </form>
            <Button class="forgot-btn">Forgot password?</Button>
            <div class="separate"></div>
            <Button outline class="google-btn">
                <img class="google-logo" src="../assets/images/google.png" alt="google-logo" />
                <span>Continue with Google</span>
            </Button>
            <Button success class="new-account-btn" :to="'/register'">Create new account</Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.background__wrapper {
    @include flex-center();

    height: 100vh;
    width: 100%;

    background: linear-gradient(45deg, #9055ff, #ed7b84, #fad6a6);

    $width: min(500px, 80%);
    .login__wrapper {
        @include col-center();
        width: $width;
        padding: 32px;
        border-radius: 8px;
        background-color: #fff;
        .login__form {
            width: 100%;

            .input {
                margin: 16px 0;
            }
            .login-btn {
                width: 100%;
                padding: 12px;
                margin: 8px 0;
                font-size: 1.4rem;
            }
        }

        .forgot-btn {
            color: $text-primary;
        }

        .separate {
            margin: 32px 0;
            width: 100%;
            height: 1px;
            background-color: $bg-gray;
        }
        .google-btn {
            width: 100%;

            span {
                margin: 0 8px;
                color: $text-primary;
            }
            .google-logo {
                width: 24px;
                height: 24px;
                object-fit: cover;
            }
        }

        .new-account-btn {
            width: 100%;
            padding: 12px;
        }
    }
}
</style>
