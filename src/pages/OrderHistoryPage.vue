<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ScreenBase from '../components/ScreenBase.vue';
import * as invoiceService from '../services/invoice.service';
import { useStore } from 'vuex';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatMoney, formatDate } from '../utils/format';
import Button from '../components/Button.vue';
import ArrowRightIcon from '../components/Icons/ArrowRightIcon.vue';

const invoices = ref<IInvoiceResponse[]>([]);
const store = useStore();
onMounted(async () => {
    try {
        const result = await invoiceService.getByUser(store.getters['user']._id);
        if (result) {
            invoices.value = result.sort((a, b) => {
                return new Date(b.updatedAt as string).getTime() - new Date(a.updatedAt as string).getTime();
            });
        }
    } catch (error) {
        console.log(`file: OrderHistoryPage.vue:17 > error:`, error);
    }
});

function caclTotal(invoice: IInvoiceResponse) {
    const total = invoice.carts.reduce((acc, item) => acc + item.priceSale * item.quantity, 0);

    return formatMoney(total);
}
</script>

<template>
    <ScreenBase :title="'Lịch sử đặt món'" fullScreen>
        <div class="order-history">
            <div class="invoice__section" v-for="invoice in invoices" :key="invoice._id">
                <div class="card__wrapper" v-for="item in invoice.carts" :key="item._id">
                    <img class="product__preview" :src="item.photo" alt="" />
                    <div class="card__info">
                        <div class="product__name">{{ item.name }}</div>
                        <div class="product__price">
                            <div class="product__quantity">x{{ item.quantity }}</div>
                            <div class="product__price--sale">{{ formatMoney(item.priceSale) }}đ</div>
                            <div class="product__total">
                                <span>Thành tiền:</span> {{ formatMoney(item.priceSale * item.quantity) }}đ
                            </div>
                        </div>
                    </div>
                    <Button class="detail-btn" :to="`/detail?p=${item.slug}`">
                        <span>Xem</span>
                        <ArrowRightIcon :color="`#ff964f`" :width="'1.1rem'" :height="'0.8rem'" />
                    </Button>
                </div>
                <div class="invoice-info">
                    <p class="invoice-date">{{ formatDate(invoice.updatedAt as string) }}</p>
                    <p class="invoice-total"><span>Tổng tiền:</span> {{ caclTotal(invoice) }}đ</p>
                </div>
            </div>
        </div>
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
