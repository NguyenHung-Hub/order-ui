<script setup lang="ts">
import { computed, onMounted, ref, watchEffect, onBeforeMount, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { IInvoiceItemResponse, IInvoiceStatus } from '../interfaces/invoice.interface';
import ChefView from '../components/ChefView.vue';
import { cloneDeep } from 'lodash';
let invoiceStatus = reactive<IInvoiceStatus>({ waitingConfirm: [], serving: [], finish: [], cancel: [] });
let invoicesServing = reactive<IInvoiceItemResponse[]>([]);

const store = useStore();

const handleMap = (invoiceStatus: IInvoiceStatus) => {
    if (invoiceStatus) {
        const invoiceStatusCopy = cloneDeep(invoiceStatus);

        const invoiceItemsTemp = invoiceStatusCopy.serving.reduce((acc, curr) => {
            return [...acc, ...curr.items];
        }, [] as IInvoiceItemResponse[]);

        const invoiceItems: IInvoiceItemResponse[] = [];
        invoiceItemsTemp?.forEach((invoice, index) => {
            const findIndex = invoiceItems.findIndex((item) => item.product._id === invoice.product._id);

            if (findIndex < 0) {
                invoiceItems.push(invoice);
            } else {
                invoiceItems[findIndex].quantity = invoiceItems[findIndex].quantity + invoice.quantity;
            }
        });

        invoicesServing.length = 0;
        invoicesServing.push(...invoiceItems);
    }
};

onBeforeMount(async () => {
    await store.dispatch('fetchInvoices', store.getters['shopId']);
    invoiceStatus = store.getters['invoices'];

    if (invoiceStatus) handleMap(invoiceStatus);
});

watchEffect(() => {
    invoiceStatus = store.getters['invoices'];
    handleMap(invoiceStatus);
});
</script>

<template>
    <div class="wrapper">
        <ChefView :invoices="invoicesServing" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    .name {
        font-size: 1.4rem;
    }
}
</style>
