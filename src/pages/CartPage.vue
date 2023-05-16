<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import ScreenBase from '../components/ScreenBase.vue';
import Button from '../components/Button.vue';
import InputQuantity from '../components/InputQuantity.vue';
import CrossIcon from '../components/Icons/CrossIcon.vue';
import { ICartItem } from '../interfaces/cart.interface';
import { useStore } from 'vuex';
import { formatMoney } from '../utils/format';

const cartItems = ref<ICartItem[]>([]);
const countCart = ref<string>('');
const invoicePrice = ref<number>(0);
const store = useStore();

watchEffect(() => {
    cartItems.value = store.getters['cartItems'];
    invoicePrice.value = store.getters['invoicePrice'];
    const count = store.getters['countCart'];
    if (count > 0) {
        countCart.value = `(${count})`;
    } else {
        countCart.value = '';
    }
});

async function updateQuantity(value: number, cartItem: ICartItem) {
    console.log(`file: CartPage.vue:28 > value:`, value);
    cartItem.quantity = value;
    await store.dispatch('updateQuantity', cartItem);
}

async function removeCartItem(cartItem: ICartItem) {
    await store.dispatch('removeCartItem', cartItem);
}
</script>

<template>
    <ScreenBase :title="`Giỏ hàng ${countCart}`" class="cart__wrapper" hasFooter>
        <div class="cart__body" v-if="cartItems.length > 0">
            <div class="cart__item" v-for="item in cartItems">
                <img class="product__preview" :src="item.product.photo" alt="" />
                <div class="cart__info">
                    <div class="product__name">{{ item.product.name }}</div>
                    <div class="product__price">
                        <div class="product__price--origin">{{ item.product.priceOrigin }}</div>
                        <div class="product__price--sale">{{ item.product.priceSale }}</div>
                    </div>

                    <InputQuantity :value="item.quantity" @onChange="(value:number)=>updateQuantity(value, item)" />
                </div>
                <Button class="remove-btn" :click="() => removeCartItem(item)">
                    <CrossIcon :color="`#aaa`" />
                </Button>
            </div>
        </div>
        <div class="label" v-else>Chưa gọi món</div>

        <template v-slot:footer>
            <div class="cart__footer">
                <div class="invoice__wrapper">
                    <span class="invoice-label">Tổng thanh toán</span>
                    <span class="invoice-price"> {{ formatMoney(invoicePrice) }} đ</span>
                </div>

                <Button class="order-btn">Đặt món {{ countCart }}</Button>
            </div>
        </template>
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles' as *;

.cart__wrapper {
    .cart__body {
        background-color: #583939;

        .cart__item {
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
            .cart__info {
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                padding: 0 16px;
                .product__name {
                    font-size: 1.6rem;
                }
                .product__price {
                    display: flex;

                    .product__price--origin {
                        font-size: 1.4rem;
                        font-weight: 300;
                        text-decoration: line-through;
                        color: $disable-text-color;
                    }
                    .product__price--sale {
                        margin-left: 12px;
                        font-size: 1.6rem;
                        font-weight: bold;
                        color: $price-color;
                    }
                }
            }
            .remove-btn {
                position: absolute;
                top: 0;
                right: 0;

                margin: 0;
                padding: 8px;
            }
        }
    }

    .label {
        padding: 16px;
        width: 100%;

        text-align: center;
        color: $disable-text-color;
        font-size: 1.6rem;
    }
    .cart__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 10px;

        height: 100%;

        background-color: #fff;
        box-shadow: -2px 4px 10px 4px #ddd;
        .invoice__wrapper {
            .invoice-label {
                color: $text-gray;
                font-size: 1.2rem;
            }
            .invoice-price {
                margin: 2px 6px;

                font-size: 1.4rem;
                font-weight: bold;
                color: $price-color;
            }
        }

        .order-btn {
            height: 100%;
            margin: 0;

            color: #fff;
            font-weight: bold;
            font-size: 1.5rem;
            background-color: $primary3;

            border-radius: 0;
        }
    }
}
</style>
