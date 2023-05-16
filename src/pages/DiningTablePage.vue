<script setup lang="ts">
import { onMounted, watch, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

import ScreenBase from '@/components/ScreenBase.vue';
import Button from '@/components/Button.vue';

import CardInput, { Props as ICardInput } from '@/components/CardInput.vue';
import Select, { IOption } from '../components/Select.vue';
import Dropdown from '../components/Dropdown.vue';
import PlusIcon from '../components/Icons/PlusIcon.vue';
import ModalCreateArea from '../components/Modal/ModalCreateArea.vue';
import ModalCreateTable from '../components/Modal/ModalCreateTable.vue';
import { IArea } from '../interfaces/area.interface';
import { ITable } from '../interfaces/table.interface';
import * as areaService from '../services/area.service';

const store = useStore();
let areas = ref<IArea[]>([]);
const tables = ref<ITable[]>([]);

const isShowModalArea = ref<boolean>(false);
const isShowModalTable = ref<boolean>(false);

const areaOptions = ref<IOption[]>([]);

let areaIdSelected = ref<string>('');

onMounted(async () => {
    await store.dispatch('fetchAreas');
    areas.value.push(...store.getters['areas']);

    updateData(areas.value);
    areaIdSelected.value = areas.value[0]._id as string;
});

watchEffect(() => {
    if (areas.value.length > 0) {
        updateData(areas.value);
        console.log('update', areaIdSelected.value);
    }
});

function updateData(areas: IArea[]) {
    const tempTable = areas.find((area) => area._id == areaIdSelected.value);
    tables.value = tempTable?.tables as ITable[];

    areaOptions.value = areas.map((area) => ({ name: area.name, value: area._id as string }));
}

function onChangeArea(value: string) {
    areaIdSelected.value = value;
}

function addArea(value: IArea | undefined) {
    areas.value.push(value as IArea);
    toggleModalArea();
}

async function updateArea(areaSelected: ICardInput) {
    const findArea = areas.value.find((area) => area._id == areaSelected.id);
    const updateArea = { ...findArea, name: areaSelected.value };
    try {
        const result = await areaService.updateArea(updateArea as IArea);
        console.log(`file: DiningTablePage.vue:47 > result:`, result);
    } catch (error) {
        console.log(`file: DiningTablePage.vue:49 > error:`, error);
    }
}

async function deleteArea(area: ICardInput) {
    try {
        const result = await areaService.deleteArea(area.id);
        areas.value = areas.value.filter((item) => item._id != area.id);
        console.log(`file: DiningTablePage.vue:62 > result:`, result);
    } catch (error) {
        console.log(`file: DiningTablePage.vue:64 > error:`, error);
    }
}

function addTable(area: IArea | undefined) {
    const newArea = areas.value.map((item) => {
        if (item._id == area?._id) {
            return area;
        }
        return item;
    });

    areas.value = [...(newArea as IArea[])];

    toggleModalTable();
}

async function updateTable(tableSelected: ICardInput) {
    try {
        const result = await areaService.updateTable(areaIdSelected.value, tableSelected.id, tableSelected.value);
        console.log(`file: DiningTablePage.vue:95 > result:`, result);
    } catch (error) {
        console.log(`file: DiningTablePage.vue:97 > error:`, error);
    }
}

async function deleteTable(table: ICardInput) {
    try {
        const result = await areaService.deleteTable(areaIdSelected.value, table.id);

        if (result) {
            areas.value = areas.value.map((area): IArea => {
                if (area._id === areaIdSelected.value) {
                    return { ...area, tables: area.tables.filter((tbl) => tbl._id !== table.id) };
                }

                return area;
            });
        }
        console.log(areas.value);

        console.log(`file: DiningTablePage.vue:104 > result:`, result);
    } catch (error) {
        console.log(`file: DiningTablePage.vue:106 > error:`, error);
    }
}

function toggleModalArea() {
    isShowModalArea.value = !isShowModalArea.value;
}
function toggleModalTable() {
    isShowModalTable.value = !isShowModalTable.value;
}
</script>

<template>
    <ScreenBase full-screen :title="'Quản lý khu vực/bàn'">
        <div class="container-btn__wrapper">
            <Button success :click="toggleModalArea">
                <PlusIcon :color="`#fff`" />
                <span class="label">Thêm khu vực</span>
            </Button>
            <Button success :click="toggleModalTable">
                <PlusIcon :color="`#fff`" />
                <span class="label">Thêm bàn</span>
            </Button>
        </div>

        <Dropdown :title="'Khu vực / Tầng / Phòng'" :is-open="true">
            <div class="area__wrapper">
                <CardInput
                    v-for="area in areas"
                    :key="area._id"
                    :value="area.name"
                    :id="(area._id as string)"
                    @on-update="updateArea"
                    @on-delete="deleteArea"
                />
            </div>
        </Dropdown>
        <Dropdown :title="'Bàn'">
            <div class="dining-table__head">
                <Select :options="areaOptions" @value="onChangeArea" />
            </div>
            <div class="dining-table__body">
                <CardInput
                    v-for="table in tables"
                    :key="table._id"
                    :value="table.name"
                    :id="(table._id as string)"
                    @on-update="updateTable"
                    @on-delete="deleteTable"
                />
            </div>
        </Dropdown>

        <ModalCreateArea @on-close="toggleModalArea" @on-update="addArea" v-if="isShowModalArea" />
        <ModalCreateTable
            :areas="areaOptions"
            @on-close="toggleModalTable"
            @on-update="addTable"
            v-if="isShowModalTable"
        />
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.container-btn__wrapper {
    display: flex;

    margin: 4px;
}

.dining-table__head {
    display: flex;

    margin: 8px 0;
}
.dining-table__body {
}
</style>
