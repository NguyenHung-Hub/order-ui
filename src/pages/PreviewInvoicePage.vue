<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import * as invoiceService from '../services/invoice.service';
import InvoiceView from '../components/InvoiceView.vue';
import Button from '../components/Button.vue';
import { emitInvoicePrint } from '../socket/manager.socket';
import { emitPrintOrderDone } from '../socket/waiter.socket';
import { useStore } from 'vuex';
import { TRoleName } from '../interfaces/auth.interface';
import ScreenBase from '../components/ScreenBase.vue';

const store = useStore();
const route = useRoute();
const invoice = ref<IInvoiceResponse>();

const userRole = ref<TRoleName>(store.getters['userRole']);
const refChildrenComp = ref();

onBeforeMount(async () => {
    const invoiceId = (route.query.invoiceId as string) || '';
    console.log(`file: PreviewInvoicePage.vue:12 > invoiceId:`, invoiceId);

    try {
        const result = await invoiceService.getById(invoiceId);
        if (result) {
            console.log(`file: PreviewInvoicePage.vue:17 > result:`, result);
            invoice.value = result[0];
        }
    } catch (error) {
        console.log(`file: PreviewInvoice.vue:18 > error:`, error);
    }
});

function handleRequirePayment() {
    if (invoice.value) {
        emitInvoicePrint(invoice.value);
    }
}

function handlePrint() {
    let w = window.open();
    w?.document.write(refChildrenComp.value.refComp.innerHTML);
    w?.document.close();
    w?.setTimeout(() => {
        w?.print();
    }, 500);
}

function notifyToWaiter() {
    emitPrintOrderDone({
        invoiceId: invoice.value?._id as string,
        waiterId: invoice.value?.waiterId as string,
        message: `In xong hóa đơn cho khách ${invoice.value?.customerName} ở ${invoice.value?.area.areaName} - ${invoice.value?.area.tableName}`,
    });
    console.log('notify');
}
</script>

<template>
    <ScreenBase>
        <div class="wrapper">
            <InvoiceView :invoice="invoice" ref="refChildrenComp" v-if="invoice" />

            <div class="container-btn" v-if="userRole === 'manager'">
                <Button primary rounded :click="handlePrint">In hóa đơn</Button>
                <Button primary rounded :click="notifyToWaiter">Thông báo phục vụ</Button>
            </div>
            <Button primary rounded :click="handleRequirePayment" v-else>Yêu cầu thanh toán</Button>
        </div>
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.wrapper {
    @include col-center();
    width: 100%;

    .container-btn {
        display: flex;
    }
}
</style>
