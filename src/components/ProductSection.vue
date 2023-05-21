<script setup lang="ts">
import Button from '../components/Button.vue';
import CardProduct from './CardProduct.vue';
import ChervonRightIcon from '../components/Icons/ChervonRightIcon.vue';
import { IProduct, IProductsByCategories } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';

interface Props {
    title?: string;
    categorySlug?: string;
    categoryName?: string;
    products?: IProduct[] | undefined;
}
const props = withDefaults(defineProps<Props>(), {
    products: undefined,
});
</script>

<template>
    <div class="wrapper-section">
        <div class="head-section">
            <h2 class="title-section">{{ props.title || props.categoryName }}</h2>
            <Button class="btn-all" :to="`/category/${props.categorySlug}`">
                <span>Xem tất cả</span>
                <ChervonRightIcon />
            </Button>
        </div>
        <div class="scroll-section">
            <div class="content-section">
                <CardProduct
                    v-for="(product, index) in props.products"
                    :key="index + 1"
                    :product="product"
                    class="margin-right"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.wrapper-section {
    padding: 4px;
    margin: 2px 0;
    width: 100%;
    overflow: hidden;

    background-color: #ffea48;

    .head-section {
        @include flex-between();
        .title-section {
            color: $text-primary;
            font-size: 2.2rem;
        }
        .btn-all {
            padding: 4px 0 4px 8px;
            @include flex-center();
            background: transparent;

            span {
                color: $text-primary;
            }
        }
    }
    .scroll-section {
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
        .content-section {
            display: flex;
            flex-direction: row;

            .margin-right {
                &:not(:last-child) {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
