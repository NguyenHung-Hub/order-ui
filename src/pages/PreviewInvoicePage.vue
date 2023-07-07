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
import ToastCenter from '../components/Toast/ToastCenter.vue';
import * as notificationService from '../services/notification.service';
import { INotification } from '../interfaces/notification.interface';

const store = useStore();
const route = useRoute();
const invoice = ref<IInvoiceResponse>();

const userRole = ref<TRoleName>(store.getters['userRole']);
const refChildrenComp = ref();
const toastRef = ref();

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

async function notifyToWaiter() {
    try {
        const notification: INotification = {
            sender: store.getters['userId'],
            receiver: invoice.value?.waiterId as string,
            content: `In xong hóa đơn cho khách ${invoice.value?.customerName} ở ${invoice.value?.area.areaName} - ${invoice.value?.area.tableName}`,
            isRead: false,
        };
        const result = await notificationService.create(notification);

        if (result) {
            const notify = await emitPrintOrderDone(result);
            console.log(`file: PreviewInvoicePage.vue:59 > notify:`, notify);
            toastRef.value.showToast();
        }
    } catch (error) {
        console.log(`file: PreviewInvoicePage.vue:71 > error:`, error);
    }
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

        <ToastCenter :content="'Đã thông báo cho nhân viên phục vụ'" ref="toastRef" />
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
