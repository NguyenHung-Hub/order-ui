<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ScreenBase from '../components/ScreenBase.vue';
import * as invoiceService from '../services/invoice.service';
import { useStore } from 'vuex';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatMoney } from '../utils/format';
import CardHorizontal from '../components/Card/CardHorizontal.vue';

const invoices = ref<IInvoiceResponse[]>([]);
const store = useStore();
onMounted(async () => {
    try {
        const result = await invoiceService.getByUser(store.getters['user']._id);
        if (result) {
            invoices.value = result;
        }
    } catch (error) {
        console.log(`file: OrderHistoryPage.vue:17 > error:`, error);
    }
});

function calcTotal(invoice: IInvoiceResponse) {
    const total = invoice.carts.reduce((acc, item) => acc + item.priceSale * item.quantity, 0);

    return formatMoney(total);
}
</script>

<template>
    <ScreenBase :title="'Lịch sử đặt món'" fullScreen>
        <CardHorizontal :invoices="invoices" />
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

@mixin totalPrice {
    font-size: 1.4rem;
    color: $price-color;
    font-weight: 400;
    span {
        font-weight: 300;
        color: $disable-text-color;
    }
}

.order-history {
    background: #eeeeee;
    .invoice__section {
        margin: 8px 0;
        padding: 0 6px;
        background-color: #fff;
        .card__wrapper {
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
                        @include totalPrice();
                    }
                }
            }
            .detail-btn {
                position: absolute;
                right: 4px;
                bottom: 4px;
                margin: 0;
                padding: 8px;

                color: #ff964f;

                span {
                    margin-right: 4px;
                }
            }
        }

        .invoice-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 8px 16px;
            .invoice-date,
            .invoice-total {
                font-size: 1.4rem;
            }
            .invoice-date {
                color: $disable-text-color;
                font-size: 1.2rem;
                font-weight: 300;
                font-style: italic;
            }
            .invoice-total {
                @include totalPrice();
            }
        }
    }
}
</style>
