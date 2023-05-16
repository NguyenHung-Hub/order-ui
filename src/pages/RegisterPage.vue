<script setup lang="ts">
import Input from '../components/Input/Input.vue';
import Button from '../components/Button.vue';

function handleRegister(event: Event) {
    console.log(`file: RegisterPage.vue:6 > event:`, event.target);
}
</script>

<template>
    <div class="background__wrapper">
        <div class="login__wrapper">
            <form class="login__form" @submit.prevent="handleRegister">
                <Input :title="'Phone number'" :type="'number'" class="input" />
                <Input :title="'Email'" :type="'email'" class="input" />
                <Input :title="'Password'" :type="'password'" class="input" />

                <Button primary class="login-btn">Register</Button>
            </form>

            <h3>
                Already account? <span><a href="/login">Login now</a></span>
            </h3>

            <div class="separate"></div>
            <Button outline class="google-btn">
                <img class="google-logo" src="../assets/images/google.png" alt="google-logo" />
                <span>Continue with Google</span>
            </Button>
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
    }
}
</style>
