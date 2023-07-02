<script setup lang="ts">
import { onMounted } from 'vue';
import { joinRoomShopWaiter, onGetOrderFromCustomer, onReceiveInvoiceItemDone } from './socket/waiter.socket';
import { joinRoomShopChef, onGetOrderFromWaiter } from './socket/chef.socket';
import { useStore } from 'vuex';
import roleName from './config/roleName';
import { joinRoomShopManager } from './socket/manager.socket';
import { onGetInvoicePrint } from './socket/manager.socket';

const store = useStore();

onMounted(() => {
    onGetOrderFromCustomer();
    onGetOrderFromWaiter();
    onReceiveInvoiceItemDone();
    onGetInvoicePrint();

    const role = store.getters['userRole'];
    const userId = store.getters['userId'];
    const shopId = store.getters['shopId'];

    if (role == roleName.CUSTOMER) {
        document.title = `${store.getters['shopName']}`;
    } else if (role == roleName.WAITER) {
        joinRoomShopWaiter({ shopId, userId });
        document.title = `${store.getters['shopName']} - ${role}`;
    } else if (role == roleName.CHEF) {
        joinRoomShopChef(shopId);
        document.title = `${store.getters['shopName']} - ${role}`;
    } else if (role == roleName.MANAGER) {
        joinRoomShopManager({ shopId, userId });
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
