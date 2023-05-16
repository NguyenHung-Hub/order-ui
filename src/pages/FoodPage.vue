<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '../components/Button.vue';
import PlusIcon from '../components/Icons/PlusIcon.vue';
import ModalCreateCategory from '../components/Modal/ModalCreateCategory.vue';
import ScreenBase from '../components/ScreenBase.vue';
import Dropdown from '../components/Dropdown.vue';
import CardInput, { Props as ICardInput } from '../components/CardInput.vue';
import { useStore } from 'vuex';
import * as categoryService from '../services/category.service';
import { ICategory } from '../interfaces/category.interface';

const store = useStore();
let categories = ref<ICategory[]>([]);

onMounted(async () => {
    await store.dispatch('fetchCategories');
    categories.value.push(...store.getters['categories']);
});

console.log(`file: FoodPage.vue:15 > categories:`, categories);

const isShowModalCategory = ref<boolean>(false);

function toggleModalCategory() {
    isShowModalCategory.value = !isShowModalCategory.value;
}

function addCategory(value: ICategory | undefined) {
    categories.value.push(value as ICategory);
    toggleModalCategory();
}

async function updateCategory(value: ICardInput) {
    console.log(value);

    const category = categories.value.find((item) => item._id == value.id);
    const updateCategory = { ...category, name: value.value };

    try {
        const result = await categoryService.updateCategory(updateCategory as ICategory);
        if (result) {
            console.log(`file: FoodPage.vue:37 > result:`, result);
        }
    } catch (error) {
        console.log(`file: FoodPage.vue:41 > error:`, error);
    }
}

async function deleteCategory(value: ICardInput) {
    console.log(`file: FoodPage.vue:52 > value:`, value);
    try {
        const result = await categoryService.deleteCategory(value.id);
        if (result) {
            const newCategory = categories.value.filter((item) => item._id != value.id);

            categories.value = [...newCategory];
        }
    } catch (error) {
        console.log(`file: FoodPage.vue:58 > error:`, error);
    }
}
</script>

<template>
    <ScreenBase :title="'Food & Category'" full-screen>
        <div class="food__wrapper">
            <div class="container-btn__wrapper">
                <Button success :to="'/food/create'">
                    <PlusIcon :color="`#fff`" />
                    <span class="label">Thêm món</span>
                </Button>
                <Button success :click="toggleModalCategory">
                    <PlusIcon :color="`#fff`" />
                    <span class="label">Thêm danh mục</span>
                </Button>
            </div>

            <Dropdown :title="'Danh mục'" :is-open="true">
                <div class="area__wrapper">
                    <CardInput
                        v-for="category in categories"
                        :key="category._id"
                        :value="category.name"
                        :id="category._id as string"
                        @on-update="updateCategory"
                        @on-delete="deleteCategory"
                    />
                </div>
            </Dropdown>

            <ModalCreateCategory @on-close="toggleModalCategory" @on-update="addCategory" v-if="isShowModalCategory" />
        </div>
    </ScreenBase>
</template>

<style scoped lang="scss">
.food__wrapper {
    width: 100%;
    .container-btn__wrapper {
        display: flex;
        .label {
        }
    }
}
</style>
