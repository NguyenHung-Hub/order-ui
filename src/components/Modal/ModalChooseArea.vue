<script setup lang="ts">
import { watch, onMounted, reactive } from 'vue';
import Button from '../Button.vue';
import ModalBase from '../ModalBase.vue';
import Select, { IOption } from '../Select.vue';
import { IArea, IAreaInfo } from '../../interfaces/area.interface';
import { ITable } from '../../interfaces/table.interface';

interface Props {
    areas: IArea[];
    selected: {
        areaId: string;
        areaName: string;
        tableId: string;
        tableName: string;
    };
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (event: 'cancel'): void;
    (event: 'value', area: IAreaInfo): void;
}>();

const optionsArea = reactive<{ areas: IOption[]; tables: IOption[] }>({ areas: [], tables: [] });

const selected = reactive<IAreaInfo>({
    areaId: props.selected.areaId,
    areaName: props.selected.areaName,
    tableId: props.selected.tableId,
    tableName: props.selected.tableName,
});

onMounted(() => {
    optionsArea.areas = props.areas.reduce(
        (acc, curr) => [...acc, { name: curr.name, value: curr._id } as IOption],
        [] as IOption[],
    );

    updateOptionData(props.areas);
});

watch(
    () => selected.areaId,
    () => {
        updateOptionData(props.areas);
    },
);

function updateOptionData(areas: IArea[]) {
    optionsArea.tables = areas.reduce((acc: IOption[], curr: IArea) => {
        if (curr._id === selected.areaId) {
            return curr.tables.reduce(
                (acc2: IOption[], curr2: ITable) => [...acc2, { name: curr2.name, value: curr2._id } as IOption],
                [] as IOption[],
            );
        }
        return acc;
    }, [] as IOption[]);
}

function onChangeArea(value: string, name: string) {
    selected.areaName = name;
    selected.areaId = value;
}
function onChangeTable(value: string, name: string) {
    selected.tableName = name;
    selected.tableId = value;
}
function emitOnClose() {
    emit('cancel');
}

function handleChooseArea() {
    emit('value', {
        areaId: selected.areaId,
        areaName: selected.areaName,
        tableId: selected.tableId,
        tableName: selected.tableName,
    });
    emitOnClose();
}
</script>

<template>
    <ModalBase header @on-close="emitOnClose">
        <div class="head">
            <Select :label="'Khu vực'" :options="optionsArea.areas" :selected="selected.areaId" @value="onChangeArea" />
            <Select :label="'Bàn'" :options="optionsArea.tables" :selected="selected.tableId" @value="onChangeTable" />
        </div>
        <Button success :click="handleChooseArea">Xong</Button>
    </ModalBase>
</template>

<style scoped lang="scss">
.head {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin-bottom: 16px;
}
</style>
