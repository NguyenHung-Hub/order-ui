<script setup lang="ts">
import { onMounted } from 'vue';
import { joinRoomShopWaiter, onGetOrderFromCustomer } from './socket/waiter.socket';
import { joinRoomShopChef, onGetOrderFromWaiter } from './socket/chef.socket';
import { useStore } from 'vuex';
import roleName from './config/roleName';

const store = useStore();

onMounted(() => {
    onGetOrderFromCustomer();
    onGetOrderFromWaiter();

    const role = store.getters['userRole'];

    if (role == roleName.CUSTOMER) {
        document.title = `${store.getters['shopName']}`;
    } else if (role == roleName.WAITER) {
        joinRoomShopWaiter(store.getters['shopId']);
        document.title = `${store.getters['shopName']} - ${role}`;
    } else if (role == roleName.CHEF) {
        joinRoomShopChef(store.getters['shopId']);
        document.title = `${store.getters['shopName']} - ${role}`;
    }
});
</script>

<template>
    <div class="main-wrapper">
        <router-view class="content"></router-view>
    </div>
</template>

<style scoped lang="scss">
@use './styles/index' as *;

.main-wrapper {
    position: relative;
    width: 100%;

    .header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;

        z-index: 1;
    }

    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        z-index: 1;
    }
}
</style>
