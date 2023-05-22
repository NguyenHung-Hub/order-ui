<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import ButtonOrder from './ButtonOrder.vue';
import { IProduct } from '../interfaces/product.interface';
import { formatMoney } from '../utils/format';
import Button from './Button.vue';
import { useStore } from 'vuex';
import { ICartItem } from '../interfaces/cart.interface';
import { routesName } from '../router';
interface Props {
    product: IProduct;
}
const router = useRouter();
const route = useRoute();
const props = withDefaults(defineProps<Props>(), {});
const store = useStore();

function showDetail() {
    console.log(props.product?.slug);

    router.push({ name: routesName.ProductDetailPage, query: { p: props.product?.slug } });
}

async function handleAddCartItem() {
    const item: ICartItem = { product: props.product, quantity: 1 };
    await store.dispatch('addCartItem', item);
}
</script>

<template>
    <div class="card">
        <div class="card-head" @click="showDetail">
            <img class="card-img" :src="props.product?.photo" :alt="props.product?.name" />
        </div>
        <div class="card-body">
            <h3 class="product-name" @click="showDetail">{{ props.product?.name }}</h3>
            <div class="card-body-bottom">
                <p class="product-price">{{ formatMoney(props.product?.priceSale as number) }} đ</p>
                <Button class="add-cart-btn" primary :click="handleAddCartItem"> Thêm vào giỏ </Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.card {
    margin: 6px 0;

    background-color: #fff;

    border-radius: 8px;

    .card-head {
        .card-img {
            width: $width-card-img;
            height: $width-card-img;
            object-fit: cover;

            border-radius: 8px;
        }
    }

    .card-body {
        padding: 6px 8px;
        .product-name {
            font-size: 1.5rem;
            font-weight: 400;
            color: $text-primary;
        }

        .card-body-bottom {
            @include flex-between();
            padding: 6px 0;
            .product-price {
                // margin: 4px 0;
                font-size: 1.4rem;
                font-weight: bold;
                color: $price-color;
            }
            .add-cart-btn {
                margin: 0;
                padding: 4px 0;
                font-size: 1.2rem;
                font-weight: bold;
                word-wrap: none;

                color: cornflowerblue;
                user-select: none;
                background: transparent;
            }
        }
    }
}
</style>
