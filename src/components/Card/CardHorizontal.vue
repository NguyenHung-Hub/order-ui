<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { IInvoice, IInvoiceResponse } from '../../interfaces/invoice.interface';
import { UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { formatDate, formatMoney } from '../../utils/format';
import Button from '../../components/Button.vue';
import ArrowRightIcon from '../../components/Icons/ArrowRightIcon.vue';
import ModalConfirm from '../Modal/ModalConfirm.vue';
import * as invoiceService from '../../services/invoice.service';
import { calcTotal } from '../../utils/calcInvoices';
import { useStore } from 'vuex';
import { IMoveInvoiceData } from '../../store/module/invoice/invoice';
import { TRoleName } from '../../interfaces/auth.interface';
import DotHorizontal from '../Loading/DotHorizontal.vue';
import LabelLoading from '../Loading/LabelLoading.vue';
import { emitInvoiceToChef } from '../../socket/chef.socket';

interface Props {
    invoices: IInvoiceResponse[];
    showInfo?: boolean;
}
const store = useStore();

const props = withDefaults(defineProps<Props>(), {
    showInfo: false,
});
const isShowModal = ref(false);
const isCustomer = ref(false);
const isWaiter = ref(false);
const invoiceIdOnClick = ref('');

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

function showModal(invoiceId: string) {
    isShowModal.value = true;
    invoiceIdOnClick.value = invoiceId;
}

/**
 * update field status:'serving'
 */
async function confirmUpdateInvoice() {
    isShowModal.value = false;
    console.log(invoiceIdOnClick.value);

    const findInvoice = props.invoices.filter((i) => i._id === invoiceIdOnClick.value);
    const updateInvoice: IInvoice = new UpdateInvoiceDto({ ...findInvoice[0], status: 'serving' });
    const result = await invoiceService.update(updateInvoice);

    if (result) {
        const dataMoveInvoice: IMoveInvoiceData = { invoice: result, from: 'waitingConfirm', to: 'serving' };
        await store.dispatch('moveInvoice', dataMoveInvoice);
        emitInvoiceToChef(result);
    }
}
</script>

<template>
    <div class="card-list__wrapper">
        <div class="card__section" v-for="invoice in props.invoices" :key="invoice._id">
            <div class="card__body" v-for="(item, index) in invoice.items" :key="index">
                <img class="product__preview" :src="item.product.photo" alt="" />
                <div class="card__info">
                    <div class="product__name">{{ item.product.name }}</div>
                    <div class="product__price">
                        <div class="product__quantity">x{{ item.quantity }}</div>
                        <div class="product__price--sale">{{ formatMoney(item.product.priceSale) }}đ</div>
                        <div class="product__total">
                            <span>Thành tiền:</span> {{ formatMoney(item.product.priceSale * item.quantity) }}đ
                        </div>
                    </div>
                </div>
                <Button class="btn-right" :to="`/detail?p=${item.product.slug}`" v-if="isCustomer">
                    <span>Xem</span>
                    <ArrowRightIcon :color="`#ff964f`" :width="'1.1rem'" :height="'0.8rem'" />
                </Button>

                <div v-if="isWaiter">
                    <LabelLoading
                        class="btn-right"
                        :label="'Chờ món'"
                        v-if="invoice.status === 'serving' && item.status === 'waitingFood'"
                    />
                    <Button class="btn-right" success v-if="item.status === 'finishFood'"> Giao món </Button>
                    <Button class="btn-right" outline v-if="item.status === 'waitingFood'"> Đã giao </Button>
                </div>
            </div>
            <div class="card-footer">
                <div class="info__wrapper" v-if="showInfo">
                    <p class="info-label">Khách: {{ invoice.customerName }}</p>
                    <p class="info-label">{{ invoice.customerPhone }}</p>
                    <p>{{ invoice.items.length }} / {{ invoice.items.length }} Đã giao</p>
                </div>
                <div class="info__wrapper">
                    <p class="info-label">{{ formatDate(invoice.updatedAt as string) }}</p>
                    <p class="info-label"><span>Tổng tiền:</span> {{ calcTotal(invoice) }}đ</p>

                    <div v-if="isWaiter">
                        <Button
                            success
                            :click="() => showModal(invoice._id)"
                            v-if="invoice.status === 'waitingConfirm'"
                        >
                            Nhận đơn
                        </Button>
                        <Button primary v-if="invoice.status === 'serving'">Xác nhận thanh toán</Button>

                        <Button outline v-if="invoice.status === 'finish'">Xong</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalConfirm :msg="'Nhận đơn???'" @okay="confirmUpdateInvoice" v-if="isShowModal" />
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
            border-bottom: 1px solid #f3f3f3;

            .product__preview {
                width: 80px;
                height: 80px;
                object-fit: cover;

                border-radius: 4px;
            }
            .card__info {
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                padding: 0 16px;
                .product__name {
                    font-size: 1.6rem;
                }
                .product__price {
                    display: flex;
                    flex-direction: column;

                    .product__quantity {
                        font-size: 1.4rem;
                        font-weight: 300;
                        color: $disable-text-color;
                    }
                    .product__price--sale {
                        font-size: 1.4rem;
                        color: $price-color;
                    }

                    .product__total {
                        @include textPrice();
                    }
                }
            }
            .btn-right {
                position: absolute;
                right: 4px;
                bottom: 4px;
                margin: 0;
                // padding: 8px;

                color: #ff964f;

                span {
                    margin-right: 4px;
                }
            }
        }

        .card-footer {
            display: flex;

            flex-direction: column;

            padding: 4px 0;

            .info__wrapper {
                display: flex;
                padding: 2px 0;
                .info-label {
                    @include textStyle();
                    margin-right: 8px;
                    font-weight: 500;
                }

                &:last-child {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .info-label {
                        &:nth-child(1) {
                            font-style: italic;
                            color: #70deb1;
                            font-weight: 400;
                        }
                        &:nth-child(2) {
                            flex: 1;
                            text-align: right;
                            @include textPrice();
                        }
                    }
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
