<script setup lang="ts">
import { ref } from 'vue';
import { IInvoiceResponse } from '../../interfaces/invoice.interface';
import { formatDate, formatMoney } from '../../utils/format';
import Button from '../../components/Button.vue';
import ArrowRightIcon from '../../components/Icons/ArrowRightIcon.vue';

interface Props {
    invoices: IInvoiceResponse[];
    showInfo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showInfo: false,
});
console.log(`file: CardHorizontal.vue:13 > props:`, props);

function calcTotal(invoice: IInvoiceResponse) {
    const total = invoice.carts.reduce((acc, item) => acc + item.priceSale * item.quantity, 0);
    return formatMoney(total);
}
</script>

<template>
    <div class="card-list__wrapper">
        <div class="card__section" v-for="invoice in props.invoices" :key="invoice._id">
            <div class="card__body" v-for="item in invoice.carts" :key="item._id">
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
            <div class="card-footer">
                <div class="info__wrapper" v-if="showInfo">
                    <p class="info-label">Khách: {{ invoice.customerName }}</p>
                    <p class="info-label">{{ invoice.customerPhone }}</p>
                </div>
                <div class="info__wrapper">
                    <p class="info-label">{{ formatDate(invoice.updatedAt as string) }}</p>
                    <p class="info-label"><span>Tổng tiền:</span> {{ calcTotal(invoice) }}đ</p>

                    <Button success>Nhận đơn</Button>
                </div>
            </div>
        </div>
    </div>
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
        transform: translateY(-100%);
        scale: 0.8;
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
    70% {
        scale: 1.1;
    }
    100% {
        transform: translateY(0);
        scale: 1;
        opacity: 1;
    }
}
</style>
