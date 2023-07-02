<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';

import { useStore } from 'vuex';
import TabBase from '../components/Tab/TabBase.vue';
import { IInvoiceResponse, IInvoiceStatus } from '../interfaces/invoice.interface';
import Button from '../components/Button.vue';
import { calcTotal } from '../utils/calcInvoices';
import { useRouter } from 'vue-router';
import { formatDate } from '../utils/format';

const store = useStore();
const router = useRouter();
const invoiceStatus = ref<IInvoiceStatus>();

onMounted(async () => {
    await store.dispatch('fetchInvoices', store.getters['shopId']);
});

watchEffect(() => {
    invoiceStatus.value = store.getters['invoices'];
    console.log(`file: WaiterPage.vue:18 >  invoiceStatus.value :`, invoiceStatus.value);
});

function handlePreviewInvoice(invoiceId: string) {
    router.push({ path: 'preview', query: { invoiceId } });
}
</script>

<template>
    <div class="wrapper">
        <TabBase :tab-names="['moi', 'xong']">
            <template v-slot:tabPanel-1>
                <div class="scroll-container">
                    <ul>
                        <li class="card" v-for="invoice in invoiceStatus?.delivered" :key="invoice._id">
                            <span>{{ formatDate(invoice.createdAt as string) }}</span>
                            <span>{{ invoice.area.areaName + ' - ' + invoice.area.tableName }}</span>
                            <span>{{ invoice.customerName }}</span>
                            <span>{{ calcTotal(invoice.items) }} đ</span>
                            <Button primary rounded :click="() => handlePreviewInvoice(invoice._id)">Xem</Button>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-slot:tabPanel-2>
                <div class="scroll-container">2</div>
            </template>
        </TabBase>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.wrapper {
    width: 100%;

    height: calc(100vh - $footer-height);

    .scroll-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .card {
            @include flex-center();
            justify-content: space-around;

            padding: 8px 0px;
            font-size: 1.3rem;
            border-bottom: 1px solid #ebebeb;

            span {
                font-size: 1.2rem;
                &:nth-child(4) {
                    color: $price-color;
                }
            }
        }
    }
}
</style>
