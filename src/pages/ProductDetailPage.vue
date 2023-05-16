<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import ProductSection from '../components/ProductSection.vue';
import Button from '../components/Button.vue';
import ArrowLeft from '../components/Icons/ArrowLeft.vue';
import { useRouter, useRoute } from 'vue-router';
import ShoppingCartIcon from '../components/Icons/ShoppingCartIcon.vue';
import ButtonOrder from '../components/ButtonOrder.vue';
import { IProduct } from '../interfaces/product.interface';
import * as productService from '../services/product.service';
import { formatMoney, calcPercent } from '../utils/format';

const router = useRouter();
const route = useRoute();

let product = ref<IProduct>();
let productsRecommend = ref<IProduct[]>();
const slug = ref<string>(route.query.p as string);

watch(
    () => route.query.p,
    () => {
        slug.value = route.query.p as string;
        getProduct(slug.value);
    },
);

onBeforeMount(async () => {
    getProduct(slug.value);
});

async function getProduct(slug: string) {
    try {
        const result = await productService.getProduct(slug);
        if (result) {
            product.value = result;
        }

        const result2 = await productService.getRecommend();
        if (result2) {
            productsRecommend.value = result2;
        }
    } catch (error) {
        console.log(`file: ProductDetailPage.vue:44 > error:`, error);
    }
}

function back() {
    router.go(-1);
}
function redirectCart() {
    router.push('/cart');
}
</script>

<template>
    <div class="product-detail__wrapper" v-if="product">
        <div class="product__head">
            <div class="product-nav">
                <Button class="btn-back" :click="back">
                    <ArrowLeft :color="`#fff`" />
                </Button>
                <Button class="btn-cart" :click="redirectCart">
                    <ShoppingCartIcon :color="`#fff`" />
                </Button>
            </div>
            <img class="product__img" :src="product?.photo" alt="lau ngon" />
        </div>
        <div class="product__body">
            <div class="product__body--top">
                <h3 class="product__name">{{ product?.name }}</h3>
                <div class="flag">
                    <span class="discount">{{
                        calcPercent(product?.priceSale as number, product?.priceOrigin as number)
                    }}</span>
                    <span class="label">Giảm</span>
                </div>
            </div>

            <div class="product__body--center">
                <div class="product__price--sale">{{ formatMoney(product?.priceSale as number) }} đ</div>
                <div class="product__price--origin">{{ formatMoney(product?.priceOrigin as number) }} đ</div>

                <ButtonOrder :border="true" />
            </div>
            <div class="product__body--center">
                <p class="product__description">
                    {{ product?.description }}
                </p>
            </div>
        </div>
        <div class="product__footer">
            <div class="product__similar">
                <ProductSection :title="'Gợi ý'" :products="productsRecommend" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.product-detail__wrapper {
    width: 100%;

    padding-bottom: 16px;

    background: #eee;
    .product__head {
        position: relative;
        .product-nav {
            position: absolute;
            top: 0;
            width: 100%;

            display: flex;
            justify-content: space-between;
            .btn-back,
            .btn-cart {
                @include flex-center();
                padding: 0;

                width: 40px;
                height: 40px;

                background: rgba($color: #000000, $alpha: 0.4);
                border-radius: 24px;

                z-index: 2;
            }
        }
        .product__img {
            position: relative;
            width: 100%;
            height: 100vw;
            object-fit: cover;
        }
    }
    .product__body {
        padding: 8px;
        margin-bottom: 8px;

        background: #fff;

        .product__body--top {
            display: flex;
            justify-content: space-between;
            .product__name {
                font-size: 2rem;
                font-weight: 400;
            }

            .flag {
                @include flex-center();
                flex-direction: column;

                $border: 16px;
                width: 0;
                height: 40px;

                border-right: $border solid $flag-discount;
                border-left: $border solid $flag-discount;
                border-bottom: 8px solid transparent;
                .discount {
                    font-weight: bold;
                    color: $price-color;
                }
                .label {
                    color: $success;
                    font-weight: bold;
                    font-size: 1.1rem;
                    text-transform: uppercase;
                }
            }
        }

        .product__body--center {
            display: flex;
            align-items: center;

            margin-top: 4px;

            .product__price--sale {
                font-size: 1.9rem;
                color: $price-color;
            }
            .product__price--origin {
                margin: 0 16px;
                font-size: 1.6rem;
                font-weight: 300;
                text-decoration: line-through;
                color: $disable-text-color;
            }
        }
        .product__body--center {
            .product__description {
                margin: 16px 0;
                color: $text-primary;
                font-weight: 300;
                font-size: 1.6rem;
            }
        }
    }

    .product__footer {
        .product__similar {
        }
    }
}
</style>
