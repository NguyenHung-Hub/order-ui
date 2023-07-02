<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { IInvoiceItemResponse, IInvoiceResponse, IUpdateInvoiceOptional } from '../../interfaces/invoice.interface';
import { formatDate } from '../../utils/format';
import Button from '../../components/Button.vue';
import ModalConfirm from '../Modal/ModalConfirm.vue';
import * as invoiceService from '../../services/invoice.service';
import { calcTotal } from '../../utils/calcInvoices';
import { useStore } from 'vuex';
import { IMoveInvoiceData } from '../../store/module/invoice/invoice';
import { TRoleName } from '../../interfaces/auth.interface';
import { emitInvoiceToChef } from '../../socket/chef.socket';
import CardServing from './CardServing.vue';
import { IAreaInfo } from '../../interfaces/area.interface';

interface Props {
    invoices: IInvoiceResponse[];
    showInfo?: boolean;
}
const store = useStore();

const props = withDefaults(defineProps<Props>(), {
    showInfo: false,
});
const isShowModalDelivered = ref(false);
const isShowModalConfirmDelivered = ref(false);

const isCustomer = ref(false);
const isWaiter = ref(false);
const invoiceIdOnClick = ref('');
const messageConfirmDeliveredAll = ref<string>('');

watchEffect(() => {
    const role: TRoleName = store.getters['userRole'];
    switch (role) {
        case 'customer':
            isCustomer.value = true;
            break;
        case 'waiter':
            isWaiter.value = true;
            break;

        default:
            break;
    }
});

function showModalDelivered(invoiceId: string) {
    isShowModalDelivered.value = true;
    invoiceIdOnClick.value = invoiceId;
}

/**
 * update field status:'serving'
 */
async function confirmAndUpdateInvoice() {
    isShowModalDelivered.value = false;
    console.log(invoiceIdOnClick.value);

    const findInvoice = props.invoices.filter((i) => i._id === invoiceIdOnClick.value);
    const updateInvoice: IUpdateInvoiceOptional = {
        _id: findInvoice[0]._id,
        status: 'serving',
        waiterId: store.getters['userId'],
    };
    const result = await invoiceService.updateOptional(updateInvoice);

    if (result) {
        const dataMoveInvoice: IMoveInvoiceData = { invoice: result, from: 'waitingConfirm', to: 'serving' };
        await store.dispatch('moveInvoice', dataMoveInvoice);
        emitInvoiceToChef(result);
    }
}

function checkDeliveredAll(item: IInvoiceItemResponse[]) {
    return item.every((i) => i.quantity == i.delivered);
}

function showModalConfirmDelivered(invoiceId: string, areaInfo: IAreaInfo) {
    messageConfirmDeliveredAll.value = `Đã giao tất cả món cho ${areaInfo.tableName} - ${areaInfo.areaName}`;
    isShowModalConfirmDelivered.value = true;
    invoiceIdOnClick.value = invoiceId;
}
async function confirmDeliveredAll() {
    try {
        const result = await invoiceService.updateOptional({ _id: invoiceIdOnClick.value, status: 'delivered' });

        if (result) {
            const dataMoveInvoice: IMoveInvoiceData = { invoice: result, from: 'serving', to: 'delivered' };
            await store.dispatch('moveInvoice', dataMoveInvoice);
            isShowModalConfirmDelivered.value = false;
        }
    } catch (error) {
        console.log(`file: CardHorizontal.vue:95 > error:`, error);
    }
}
</script>

<template>
    <div class="card-list__wrapper">
        <div class="card__section" v-for="invoice in props.invoices" :key="invoice._id">
            <div class="card__body" v-for="(item, index) in invoice.items" :key="index">
                <CardServing
                    :invoice-id="invoice._id"
                    :invoice-item="item"
                    :invoice-status="invoice.status"
                    :invoice-area="`${invoice.area.areaName} - ${invoice.area.tableName}`"
                />
            </div>
            <div class="card-footer">
                <div class="left__wrapper" v-if="showInfo">
                    <p class="info-label">Khách: {{ invoice.customerName }}</p>
                    <p class="info-label">{{ invoice.area.areaName }} - {{ invoice.area.tableName }}</p>
                    <p class="info-label">{{ formatDate(invoice.createdAt as string) }}</p>
                </div>
                <div class="right__wrapper">
                    <p class="info-label"><span>Tạm tính:</span> {{ calcTotal(invoice.items) }}đ</p>

                    <div v-if="isWaiter">
                        <Button
                            success
                            :click="() => showModalDelivered(invoice._id)"
                            v-if="invoice.status === 'waitingConfirm'"
                        >
                            Nhận đơn
                        </Button>
                        <Button
                            primary
                            :click="() => showModalConfirmDelivered(invoice._id, invoice.area)"
                            v-if="checkDeliveredAll(invoice.items) && invoice.status == 'serving'"
                        >
                            Xong
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalConfirm
        :msg="'Nhận đơn???'"
        @okay="confirmAndUpdateInvoice"
        @cancel="() => (isShowModalDelivered = false)"
        v-if="isShowModalDelivered"
    />
    <ModalConfirm
        :msg="messageConfirmDeliveredAll"
        @okay="confirmDeliveredAll"
        @cancel="() => (isShowModalConfirmDelivered = false)"
        v-if="isShowModalConfirmDelivered"
    />
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

@mixin textPrice {
    font-size: 1.4rem;
    color: $price-color;
    font-weight: 400;
    span {
        font-weight: 300;
        color: $disable-text-color;
    }
}

@mixin textStyle {
    color: $text-primary;
    font-size: 1.2rem;
    font-weight: 400;
}

.card-list__wrapper {
    background: #eeeeee;
    .card__section {
        margin: 8px 0;
        padding: 0 6px;
        background-color: #fff;

        animation: slideLeftToRight 0.25s backwards;
        .card__body {
            position: relative;
            padding: 12px;
            display: flex;

            background-color: #fff;
            border-bottom: 1px solid #ededed;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;

            padding: 4px 0;

            .left__wrapper {
                display: flex;
                flex-direction: column;
                padding: 2px 0;
                .info-label {
                    @include textStyle();
                    padding: 2px 0px;
                    margin-right: 8px;
                    font-weight: 500;

                    &:last-child {
                        color: $success;
                    }
                }
            }

            .right__wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .info-label {
                    @include textPrice();
                    margin-bottom: 8px;
                }
            }
        }
    }
}

@keyframes slideLeftToRight {
    0% {
        transform: translateY(-5%);
        scale: 0.95;
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
    70% {
        scale: 1.01;
    }
    100% {
        transform: translateY(0);
        scale: 1;
        opacity: 1;
    }
}
</style>
