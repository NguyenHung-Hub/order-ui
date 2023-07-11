<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted, watch, inject } from 'vue';
import ScreenBase from '../components/ScreenBase.vue';
import Button from '../components/Button.vue';
import InputQuantity from '../components/InputQuantity.vue';
import CrossIcon from '../components/Icons/CrossIcon.vue';
import { ICartItem, ICartItemRequest } from '../interfaces/cart.interface';
import { useStore } from 'vuex';
import { formatDate, formatMoney } from '../utils/format';
import * as invoiceService from '../services/invoice.service';
import { IInvoice, IInvoiceItem, IInvoiceResponse } from '../interfaces/invoice.interface';
import ModalLoading from '../components/Modal/ModalLoading.vue';
import { emitInvoiceToWaiter } from '../socket/waiter.socket';
import { IUserResponse } from '../interfaces/auth.interface';
import ModalChooseArea from '../components/Modal/ModalChooseArea.vue';
import { IArea, IAreaInfo } from '../interfaces/area.interface';
import useCookie from '../utils/useCookie';
import { calcTotal } from '../utils/calcInvoices';
import ArrowRightIcon from '../components/Icons/ArrowRightIcon.vue';
import { useRouter } from 'vue-router';

const cartItems = ref<ICartItem[]>([]);
const countCart = ref<string>('');
const invoicePrice = ref<number>(0);
// const area = reactive<IAreaInfo>({ areaId: '', areaName: '', tableId: '', tableName: '' });
const store = useStore();
const router = useRouter();

const status = ref<'loading' | 'success' | 'error'>('loading');
const isShowModal = ref<boolean>(false);
const isShowModalArea = ref<boolean>(false);
const order = ref<IInvoiceResponse>();

const areas = ref<IArea[]>([]);
const selected = reactive<IAreaInfo>({ areaId: '', areaName: '', tableId: '', tableName: '' });

const cookie = useCookie();

onMounted(async () => {
    await store.dispatch('fetchAreas');
    areas.value.push(...store.getters['areas']);

    const areaFirst = areas.value[0];
    selected.areaId = areaFirst._id as string;
    selected.areaName = areaFirst.name;
    selected.tableId = areaFirst.tables[0]._id as string;
    selected.tableName = areaFirst.tables[0].name;

    if (cookie.getCookie('area')) {
        const areaLocal: IAreaInfo = JSON.parse(cookie.getCookie('area') || '');

        selected.areaId = areaLocal.areaId;
        selected.areaName = areaLocal.areaName;
        selected.tableId = areaLocal.tableId;
        selected.tableName = areaLocal.tableName;
    }
    getInvoiceCookie();
});

watchEffect(() => {
    cartItems.value = store.getters['cartItems'];
    invoicePrice.value = store.getters['invoicePrice'];
    const count = store.getters['countCartItem'];
    if (count > 0) {
        countCart.value = `(${count})`;
    } else {
        countCart.value = '';
    }

    getInvoiceCookie();
});

function getInvoiceCookie() {
    order.value = cookie.getCookie('invoice') ? JSON.parse(cookie.getCookie('invoice') || '') : '';
}

async function updateQuantity(value: number, cartItem: ICartItem) {
    console.log(`file: CartPage.vue:28 > value:`, value);
    cartItem.quantity = value;
    await store.dispatch('updateQuantity', cartItem);
}

async function removeCartItem(cartItem: ICartItem) {
    await store.dispatch('removeCartItem', cartItem);
}

function onChangeArea(area: IAreaInfo) {
    selected.areaId = area.areaId;
    selected.areaName = area.areaName;
    selected.tableId = area.tableId;
    selected.tableName = area.tableName;

    cookie.setCookie('area', JSON.stringify(area), 24 * 60 * 60 * 1000);
}

async function handleOrder() {
    toggleShowModal();
    status.value = 'loading';

    if (cartItems.value.length > 0) {
        const cartItemRequest = cartItems.value.map(
            (item): IInvoiceItem => ({
                productId: item.product._id as string,
                quantity: item.quantity,
                status: 'waitingFood',
                done: 0,
                delivered: 0,
            }),
        );

        try {
            const customer: IUserResponse = store.getters['user'];

            const newInvoice: IInvoice = {
                shopId: customer.shop._id,
                customerId: customer._id,
                customerName: customer.fullName,
                customerPhone: customer.phone,
                items: cartItemRequest,
                status: 'waitingConfirm',
                area: {
                    areaId: selected.areaId,
                    areaName: selected.areaName,
                    tableId: selected.tableId,
                    tableName: selected.tableName,
                },
            };

            const result = await invoiceService.create(newInvoice);

            if (result) {
                status.value = 'success';
                await store.dispatch('clearCart');
                cartItems.value = [];
                emitInvoiceToWaiter(result);
                console.log(result._id);

                cookie.setCookie('invoice', JSON.stringify(result), 24 * 60 * 60 * 1000);
                localStorage.removeItem('cart');
            }
        } catch (error) {
            status.value = 'error';
            console.log(`file: CartPage.vue:50 > error:`, error);
        }
    }
}

function toggleShowModal() {
    isShowModal.value = !isShowModal.value;
}

function handlePreviewInvoice() {
    router.push({ path: 'preview', query: { invoiceId: order.value?._id } });
}
</script>

<template>
    <ScreenBase :title="`Giỏ hàng ${countCart}`" class="cart__wrapper" hasFooter>
        <div class="ordered__wrapper" v-if="order">
            <span>{{ formatDate(order.createdAt as string) }}</span>
            <span>{{ order.items.length }} món </span>
            <span>{{ calcTotal(order.items) }} đ</span>
            <Button rounded primary :click="handlePreviewInvoice">
                <span>Xem</span>
            </Button>
        </div>

        <div class="cart__body" v-if="cartItems.length > 0">
            <div class="cart__item" v-for="item in cartItems" :key="item.product._id">
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

        <template v-slot:footer>
            <div class="cart__footer">
                <div class="invoice__wrapper">
                    <span class="invoice-label">Tạm tính</span>
                    <span class="invoice-price"> {{ formatMoney(invoicePrice) }} đ</span>
                </div>

                <Button :click="() => (isShowModalArea = true)">{{
                    selected.areaName == '' ? 'Chọn bàn' : `${selected.areaName} - ${selected.tableName}`
                }}</Button>

                <Button class="order-btn" :click="handleOrder">Đặt món {{ countCart }}</Button>
            </div>
        </template>
    </ScreenBase>
    <ModalLoading
        :status="status"
        @on-close="toggleShowModal"
        v-if="isShowModal"
        :loading-msg="'Đang gọi món'"
        :success-msg="'Đã gọi món'"
        :error-msg="'Gọi món lỗi'"
    />

    <ModalChooseArea
        @cancel="() => (isShowModalArea = false)"
        @value="onChangeArea"
        :areas="areas"
        :selected="selected"
        v-if="isShowModalArea"
    />
</template>

<style scoped lang="scss">
@use '../styles' as *;

.cart__wrapper {
    position: relative;
    width: 100%;
    height: 100vh;

    .ordered__wrapper {
        @include flex-center();
        justify-content: space-around;

        padding: 8px 0px;
        font-size: 1.3rem;
        border-bottom: 1px solid #ebebeb;

        span {
            font-size: 1.2rem;
            &:nth-child(3) {
                color: $price-color;
            }
        }
    }
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
