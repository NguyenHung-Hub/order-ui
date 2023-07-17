<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import ProductSection from '../components/ProductSection.vue';
import { IProductsByCategories } from '../interfaces/product.interface';
import { useRoute, useRouter } from 'vue-router';
import { IAreaInfo } from '../interfaces/area.interface';
import useCookie from '../utils/useCookie';

const store = useStore();
const route = useRoute();
const router = useRouter();
const cookie = useCookie();

let productsByCategories = ref<IProductsByCategories[]>([]);
const isRender = ref<boolean>(false);

onMounted(async () => {
    const shopName = route.params.shop;
    const { areaId, areaName, tableId, tableName } = route.query;
    console.log(`file: HomePage.vue:20 > route.query:`, shopName, route.query);

    if (shopName && areaId && areaName && tableId && tableName) {
        const area: IAreaInfo = {
            areaId: areaId as string,
            areaName: areaName as string,
            tableId: tableId as string,
            tableName: tableName as string,
        };

        cookie.setCookie('area', JSON.stringify(area), 12 * 60 * 60 * 1000);
        router.replace(`/${shopName}`);
    }

    await store.dispatch('fetchProducts', shopName);
    productsByCategories.value = store.getters['prodByCate'];
    if (productsByCategories.value?.length > 0) {
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
