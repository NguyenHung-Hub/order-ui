<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import ModalBase from '../ModalBase.vue';
import Select, { IOption } from '../Select.vue';
import { ITable } from '../../interfaces/table.interface';
import Input from '../Input/Input.vue';
import * as areaService from '../../services/area.service';
import { IArea } from '../../interfaces/area.interface';

interface Props {
    areas: IOption[];
}

const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'onClose' | 'onUpdate', area?: IArea): void }>();

const tableName = ref<string>('');
const areaIdSelected = ref<string>(props.areas[0].value);

console.log(props.areas[0].value);

function tableOnChange(value: string) {
    tableName.value = value;
}

function emitCloseModal() {
    emit('onClose');
}

function onSelectChange(value: string) {
    areaIdSelected.value = value;
    console.log(`file: ModalCreateTable.vue:18 > value:`, value);
}

async function handleCreateTable() {
    if (tableName.value.trim() != '') {
        const result = await areaService.createTable(areaIdSelected.value, tableName.value);
        console.log(`file: ModalCreateTable.vue:38 > result:`, result);
        console.log(`file: ModalCreateTable.vue:38 > result:`, result?.tables);

        emit('onUpdate', result);
    }
}
</script>

<template>
    <Teleport to="body">
        <ModalBase header @on-close="emitCloseModal">
            <div class="form__table">
                <Select :options="props.areas" @value="onSelectChange" />
                <Input :title="'Bàn mới'" @on-change="tableOnChange" />
                <Button primary :click="handleCreateTable"> Lưu </Button>
            </div>
        </ModalBase>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.form__table {
    @include col-center();

    .input-table {
        padding: 8px;
        margin: 8px 16px;
        width: 100%;
    }
}
</style>
