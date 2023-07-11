<script setup lang="ts">
import { onMounted } from 'vue';
import { onGetOrderFromCustomer, onReceiveInvoiceItemDone } from './socket/waiter.socket';
import { onGetOrderFromWaiter } from './socket/chef.socket';
import { useStore } from 'vuex';
import { onGetInvoicePrint } from './socket/manager.socket';
import { IUserResponse } from './interfaces/auth.interface';
import { joinRoomSocket } from './socket/utils.socket';

const store = useStore();

onMounted(async () => {
    onGetOrderFromCustomer();
    onGetOrderFromWaiter();
    onReceiveInvoiceItemDone();
    onGetInvoicePrint();

    const user: IUserResponse = store.getters['user'];

    if (user) {
        joinRoomSocket(user);
        await store.dispatch('fetchNotify', user._id);
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
