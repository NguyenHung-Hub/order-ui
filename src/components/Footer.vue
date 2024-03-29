<script setup lang="ts">
import { watchEffect, computed, ref } from 'vue';
import Button from './Button.vue';
import CartIcon from './Icons/CartIcon.vue';
import HomeIcon from './Icons/HomeIcon.vue';
import UserIcon from './Icons/UserIcon.vue';

import HomeDisableIcon from './Icons/HomeDisableIcon.vue';
import CartDisableIcon from './Icons/CartDisableIcon.vue';
import UserDisableIcon from './Icons/UserDisableIcon.vue';
import { useStore } from 'vuex';
import roleName from '../config/roleName';

const store = useStore();
const shopName = store.getters['shopName'];
const countCart = ref<number>(0);
const countNotify = ref<number>(0);

const role = ref<string>('');
watchEffect(() => {
    countCart.value = store.getters['countCartItem'];
    role.value = store.getters['userRole'];

    countNotify.value = store.getters['countNotification'];
});
</script>

<template>
    <div class="footer-wrapper">
        <div class="nav-footer">
            <div class="nav-item" v-if="role == roleName.CUSTOMER">
                <RouterLink active-class="link-active" :to="{ name: 'HomePage' }" v-slot="{ isActive }">
                    <Button class="nav-btn" vertical>
                        <HomeIcon class="nav-icon" v-if="isActive" />
                        <HomeDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Trang chủ</span>
                    </Button>
                </RouterLink>
            </div>
            <div class="nav-item" v-if="role == roleName.CUSTOMER">
                <RouterLink :to="{ name: 'CartPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn nav-cart" vertical>
                        <CartIcon class="nav-icon" v-if="isActive" />
                        <CartDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Giỏ hàng</span>
                        <p class="cart-count" v-if="countCart > 0">{{ countCart }}</p>
                    </Button>
                </RouterLink>
            </div>

            <div class="nav-item" v-if="role == roleName.WAITER">
                <RouterLink :to="{ name: 'WaiterPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn nav-cart" vertical>
                        <CartIcon class="nav-icon" v-if="isActive" />
                        <CartDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Đơn đặt</span>
                        <p class="cart-count" v-if="countCart > 0">{{ countCart }}</p>
                    </Button>
                </RouterLink>
            </div>
            <div class="nav-item" v-if="role == roleName.WAITER">
                <RouterLink :to="{ name: 'NotifyPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn nav-notify" vertical>
                        <CartIcon class="nav-icon" v-if="isActive" />
                        <CartDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Thông báo</span>
                        <p class="notify-count" v-if="countNotify > 0">{{ countNotify }}</p>
                    </Button>
                </RouterLink>
            </div>
            <div class="nav-item" v-if="role == roleName.CHEF">
                <RouterLink :to="{ name: 'ChefPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn nav-cart" vertical>
                        <CartIcon class="nav-icon" v-if="isActive" />
                        <CartDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Đơn đặt</span>
                        <p class="cart-count" v-if="countCart > 0">{{ countCart }}</p>
                    </Button>
                </RouterLink>
            </div>
            <div class="nav-item" v-if="role == roleName.MANAGER">
                <RouterLink :to="{ name: 'CashierPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn nav-cart" vertical>
                        <CartIcon class="nav-icon" v-if="isActive" />
                        <CartDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Thanh toán</span>
                        <p class="cart-count" v-if="countCart > 0">{{ countCart }}</p>
                    </Button>
                </RouterLink>
            </div>

            <div class="nav-item">
                <RouterLink :to="{ name: 'UserPage' }" v-slot="{ isActive }">
                    <Button class="nav-btn" vertical>
                        <UserIcon class="nav-icon" v-if="isActive" />
                        <UserDisableIcon class="nav-icon" v-else />
                        <span class="nav-text" :class="{ disable: !isActive }">Tài khoản</span>
                    </Button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@use '../styles/index' as *;

.footer-wrapper {
    // position: fixed;
    // left: 0;
    // right: 0;
    // bottom: 0;

    height: $footer-height;

    border-top: 1px solid #d3edcb;
    background: #fff;

    .nav-footer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100%;

        .nav-item {
            display: flex;
            flex-direction: column;

            .nav-btn {
                margin: 0;

                .nav-icon {
                    margin-bottom: 6px;
                }

                .nav-text {
                    font-size: 1rem;
                    color: $enable-text-color;
                    font-family: Arial, Helvetica, sans-serif;

                    &.disable {
                        color: $disable-text-color;
                    }
                }
            }

            .nav-cart,
            .nav-notify {
                position: relative;
                .cart-count,
                .notify-count {
                    position: absolute;
                    top: 0;
                    right: 10px;
                    padding-right: 1px;

                    width: 16px;
                    height: 16px;

                    text-align: center;
                    line-height: 16px;

                    font-size: 1.1rem;

                    color: #fff;
                    background-color: $primary3;

                    border-radius: 30px;
                }
            }
        }
    }
}
</style>
