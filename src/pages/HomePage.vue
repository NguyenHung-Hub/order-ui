<script setup lang="ts">
import { useStore } from 'vuex';
import { watchEffect, ref, onMounted, reactive } from 'vue';
import ProductSection from '../components/ProductSection.vue';
import { IProductsByCategories } from '../interfaces/product.interface';

const store = useStore();
let productsByCategories = ref<IProductsByCategories[]>([]);
const isRender = ref<boolean>(false);

onMounted(async () => {
    await store.dispatch('fetchProducts', store.getters['shopId']);
    console.log(`file: HomePage.vue:13 > store:`, store);
    productsByCategories.value = store.getters['prodByCate'];
    if (productsByCategories.value.length > 0) {
        isRender.value = true;
    } else {
        isRender.value = false;
    }
});
</script>

<template>
    <div class="home-wrapper">
        <div class="scroll-container">
            <ProductSection
                v-if="isRender"
                v-for="products in productsByCategories"
                :key="products._id"
                :categorySlug="products.slug"
                :categoryName="products.name"
                :products="products.products"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles' as *;
.home-wrapper {
    @include flex-center();
    flex-direction: column;
    width: 100%;
    height: calc(100vh - $header-height - $footer-height);

    background: #fff;

    .scroll-container {
        width: 100%;
        overflow-y: scroll;
        padding-bottom: $footer-height;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
