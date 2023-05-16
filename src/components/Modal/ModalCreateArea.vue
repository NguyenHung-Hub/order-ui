<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import ModalBase from '../ModalBase.vue';
import { createArea } from '../../services/area.service';
import { IArea } from '../../interfaces/area.interface';
import Input from '../Input/Input.vue';

const emit = defineEmits<{ (event: 'onClose' | 'onUpdate', value?: IArea): void }>();
const area = ref<string>('');

function emitCloseModal() {
    emit('onClose');
}

function areaOnChange(value: string) {
    area.value = value;
}

async function handleCreateArea() {
    if (area.value.trim() != '') {
        const result = await createArea(area.value);
        console.log(`file: ModalCreateArea.vue:20 > result:`, area.value, result);
        if (result) {
            emit('onUpdate', result);
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <ModalBase header @on-close="emitCloseModal">
            <div class="form__area">
                <Input :title="'Khu vực mới'" @on-change="areaOnChange" />
                <Button primary :click="handleCreateArea"> Lưu </Button>
            </div>
        </ModalBase>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.form__area {
    @include col-center();

    .input-area {
        padding: 8px;
        margin: 0 16px 16px 8px;
        width: 100%;
    }
}
</style>
