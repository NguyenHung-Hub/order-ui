<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { IProduct } from '../interfaces/product.interface';
import * as productService from '../services/product.service';
import CardProduct from '../components/CardProduct.vue';

const route = useRoute();
const products = ref<IProduct[]>();

watchEffect(async () => {
    console.log(route.params, route.path, route.fullPath);

    const slug = (route.params.slug as string) || '';

    try {
        const result = await productService.getByCategory(slug);
        products.value = result;
        console.log(`file: CategoryPage.vue:18 > result:`, result);
    } catch (error) {
        console.log(`file: CategoryPage.vue:18 > error:`, error);
    }
});
</script>

<template>
    <div class="category__wrapper">
        <div class="category__scroll">
            <CardProduct v-for="product in products" :key="product._id" :product="product" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.category__wrapper {
    @include flex-center();
    flex-direction: column;
    height: calc(100vh - $header-height - $footer-height);

    width: 100%;

    background-color: #855e5e;
    .category__scroll {
        display: grid;
        grid-template-columns: repeat(2, auto);
        padding: 8px;
        gap: 8px;

        width: 100%;
        overflow-y: scroll;
        padding-bottom: $footer-height;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
