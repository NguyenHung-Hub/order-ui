<script setup lang="ts">
import { onMounted } from 'vue';
import { joinRoomShopWaiter, onGetOrderFromCustomer } from './socket/waiter.socket';
import { useStore } from 'vuex';
import roleName from './config/roleName';

const store = useStore();

onMounted(() => {
    onGetOrderFromCustomer();

    if (store.getters['userRole'] != roleName.CUSTOMER) {
        joinRoomShopWaiter(store.getters['shopId']);
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
