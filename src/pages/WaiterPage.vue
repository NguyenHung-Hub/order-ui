<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { useStore } from 'vuex';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatDate } from '../utils/format';
import CardHorizontal from '../components/Card/CardHorizontal.vue';
import TabBase from '../components/Tab/TabBase.vue';

const store = useStore();
const invoicesFromCustomer = ref<IInvoiceResponse[]>([]);

onMounted(async () => {
    await store.dispatch('fetchOrders', store.getters['shopId']);
});

watchEffect(() => {
    invoicesFromCustomer.value = store.getters['orders'];
    console.log(`file: WaiterPage.vue:11 > invoicesFromCustomer.value:`, invoicesFromCustomer.value);
});
</script>

<template>
    <div class="waiter-page__wrapper">
        <TabBase :tab-names="['Mới', 'Chờ món', 'Phục vụ', 'Đã xong']">
            <template v-slot:tabPanel-1>
                <div class="scroll-container">
                    <CardHorizontal :invoices="invoicesFromCustomer" show-info />
                </div>
            </template>
            <template v-slot:tabPanel-2>tab 2</template>
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
