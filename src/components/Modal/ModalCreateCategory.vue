<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import ModalBase from '../ModalBase.vue';
import { createCategory } from '../../services/category.service';
import Input from '../Input/Input.vue';
import { ICategory } from '../../interfaces/category.interface';

const emit = defineEmits<{ (event: 'onClose' | 'onUpdate', value?: ICategory): void }>();
const category = ref<string>('');
function emitCloseModal() {
    emit('onClose');
}

function categoryOnChange(value: string) {
    category.value = value;
}

async function handleCreateCategory() {
    if (category.value.trim() != '') {
        const result = await createCategory(category.value);
        console.log(`file: ModalCreateCategory.vue:20 > result:`, result);
        emit('onUpdate', result);
    }
}
</script>

<template>
    <Teleport to="body">
        <ModalBase header @on-close="emitCloseModal">
            <div class="form__category">
                <Input :title="'Danh mục mới'" @on-change="categoryOnChange" />
                <Button primary :click="handleCreateCategory"> Lưu </Button>
            </div>
        </ModalBase>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.form__category {
    @include col-center();

    .input-category {
        padding: 8px;
        margin: 8px 16px;
        width: 100%;
    }
}
</style>
