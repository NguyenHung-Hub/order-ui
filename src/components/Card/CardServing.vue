<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { IInvoiceItemResponse, TInvoiceStatus } from '../../interfaces/invoice.interface';
import { formatMoney } from '../../utils/format';
import { useStore } from 'vuex';
import { TRoleName } from '../../interfaces/auth.interface';

import Button from '../Button.vue';
import LabelLoading from '../Loading/LabelLoading.vue';
import ModalDeliveredFood from '../Modal/ModalDeliveredFood.vue';
import ArrowRightIcon from '../Icons/ArrowRightIcon.vue';
interface Props {
    invoiceId: string;
    invoiceItem: IInvoiceItemResponse;
    invoiceStatus: TInvoiceStatus;
    invoiceArea: string;
}

const store = useStore();
const props = defineProps<Props>();

const isCustomer = ref(false);
const isWaiter = ref(false);
const isShowModalDelivered = ref(false);

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
</script>

<template>
    <img class="product__preview" :src="invoiceItem.product.photo" alt="" />
    <div class="card__info">
        <div class="product__name">{{ invoiceItem.product.name }}</div>
        <div class="product__price">
            <div class="product__quantity">x{{ invoiceItem.quantity }}</div>
            <div class="product__price--sale">{{ formatMoney(invoiceItem.product.priceSale) }}đ</div>
            <div class="product__total">
                <span>Thành tiền:</span> {{ formatMoney(invoiceItem.product.priceSale * invoiceItem.quantity) }}đ
            </div>
        </div>
    </div>
    <Button class="btn-right" :to="`/detail?p=${invoiceItem.product.slug}`" v-if="isCustomer">
        <span>Xem</span>
        <ArrowRightIcon :color="`#ff964f`" :width="'1.1rem'" :height="'0.8rem'" />
    </Button>

    <p class="top-right">{{ invoiceItem.delivered }}/{{ invoiceItem.quantity }} Đã giao</p>

    <div v-if="isWaiter">
        <LabelLoading
            class="btn-right"
            :label="'Chờ món'"
            v-if="invoiceStatus === 'serving' && invoiceItem.status === 'waitingFood'"
        />
        <Button
            success
            class="btn-right"
            :click="() => (isShowModalDelivered = true)"
            v-if="invoiceItem.done > invoiceItem.delivered"
        >
            Giao món ({{ invoiceItem.done - invoiceItem.delivered }})
        </Button>
    </div>

    <ModalDeliveredFood
        :invoice-id="invoiceId"
        :product-id="invoiceItem.product._id"
        :product-name="invoiceItem.product.name"
        :table="`${invoiceArea}`"
        :quantity="invoiceItem.quantity"
        :done="invoiceItem.done"
        :delivered="invoiceItem.delivered"
        @cancel="() => (isShowModalDelivered = false)"
        v-if="isShowModalDelivered"
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

    span {
        color: #ff964f;
        margin-right: 4px;
    }
}

.top-right {
    position: absolute;
    right: 4px;
    top: 8px;

    font-size: 1.3rem;
}
</style>
