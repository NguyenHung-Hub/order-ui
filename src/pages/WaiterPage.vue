<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { useStore } from 'vuex';
import { IInvoiceResponse, IInvoiceStatus } from '../interfaces/invoice.interface';
import { formatDate } from '../utils/format';
import CardHorizontal from '../components/Card/CardHorizontal.vue';
import TabBase from '../components/Tab/TabBase.vue';

const store = useStore();
const invoiceStatus = ref<IInvoiceStatus>();

onMounted(async () => {
    await store.dispatch('fetchInvoices', store.getters['shopId']);
});

watchEffect(() => {
    invoiceStatus.value = store.getters['invoices'];
});
</script>

<template>
    <div class="waiter-page__wrapper">
        <TabBase :tab-names="['Mới', 'Phục vụ', 'Chờ thanh toán', 'Đã thanh toán']">
            <template v-slot:tabPanel-1>
                <div class="scroll-container">
                    <CardHorizontal :invoices="invoiceStatus?.waitingConfirm" show-info />
                </div>
            </template>
            <template v-slot:tabPanel-2>
                <div class="scroll-container">
                    <CardHorizontal :invoices="invoiceStatus?.serving" show-info />
                </div>
            </template>
            <template v-slot:tabPanel-3>tab 3</template>
            <template v-slot:tabPanel-4>tab 4</template>
        </TabBase>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.waiter-page__wrapper {
    width: 100%;

    height: calc(100vh - $footer-height);

    .scroll-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
