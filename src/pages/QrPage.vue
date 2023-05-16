<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import ScreenBase from '../components/ScreenBase.vue';
import Select, { IOption } from '../components/Select.vue';
import CheckBox, { IOptionCheckBox } from '../components/CheckBox.vue';
import Button from '../components/Button.vue';
import QrCode from '../components/QrCode.vue';
import DownloadIcon from '../components/Icons/DownloadIcon.vue';
import DeleteIcon from '../components/Icons/DeleteIcon.vue';
import Dropdown from '../components/Dropdown.vue';

const qrValue =
    'https://thesosoye.com/blogs/lam-dep/top-6-kem-chong-nang-cho-ba-bau-an-toan-tot-va-hieu-qua-nhat-hien-nay';

const areas: IOption[] = [
    { name: 'Tất cả', value: 'All' },
    { name: 'Khu vực 1', value: 'Area1' },
    { name: 'Khu vực 2', value: 'Area2' },
    { name: 'Khu vực 3', value: 'Area3' },
    { name: 'Khu vực 4', value: 'Area4' },
    { name: 'Khu vực 5', value: 'Area5' },
    { name: 'Khu vực 6', value: 'Area6' },
    { name: 'Khu vực 7', value: 'Area7' },
    { name: 'Khu vực 8', value: 'Area8' },
];
const tables: IOption[] = [
    { name: 'Tất cả', value: 'All' },
    { name: 'Bàn 1', value: 'Table1' },
    { name: 'Bàn 2', value: 'Table2' },
    { name: 'Bàn 3', value: 'Table3' },
    { name: 'Bàn 4', value: 'Table4' },
    { name: 'Bàn 5', value: 'Table5' },
    { name: 'Bàn 6', value: 'Table6' },
    { name: 'Bàn 7', value: 'Table7' },
    { name: 'Bàn 8', value: 'Table8' },
];

const checkboxs: IOptionCheckBox[] = [
    {
        label: 'Tên khu vực',
        value: 'hasArea',
        checked: true,
    },
    {
        label: 'Tên bàn',
        value: 'hasTable',
        checked: true,
    },
    {
        label: 'Logo',
        value: 'hasLogo',
        checked: true,
    },
    {
        label: 'Hướng dẫn',
        value: 'userGuide',
        checked: true,
    },
];

const form = reactive<{ table: string | null; area: string | null }>({
    table: null,
    area: null,
});

let qrSetting = reactive<string[]>(['as']);
function setCheckbox(values: string[]) {
    qrSetting = values;
}

const toggleOption = reactive<{ qrAvaible: boolean; qrNew: boolean }>({
    qrAvaible: true,
    qrNew: false,
});

function onSubmit() {
    console.log('91', qrSetting);

    return;
}
</script>

<template>
    <ScreenBase :title="'Tạo mã QR'" bg-gray hasFooter>
        <Dropdown :title="'Qr có sẵn'" is-open>
            <div class="qr-created__wrapper">
                <div class="card-horizontal">
                    <div class="card-horizontal__left">
                        <p class="qr-created__title">Đã yêu cầu lúc 23:30 22 Tháng 4</p>
                        <p class="qr-created__type">Định dạng .jpg</p>
                    </div>
                    <div class="card-horizontal__right">
                        <Button secondary>
                            <DeleteIcon :size="'1.6rem'" />
                        </Button>
                        <Button secondary>
                            <DownloadIcon :size="'1.6rem'" />
                        </Button>
                    </div>
                </div>
                <div class="card-horizontal">
                    <div class="card-horizontal__left">
                        <p class="qr-created__title">Đã yêu cầu lúc 23:30 22 Tháng 4</p>
                        <p class="qr-created__type">Định dạng .jpg</p>
                    </div>
                    <div class="card-horizontal__right">
                        <Button secondary>
                            <DeleteIcon :size="'1.6rem'" />
                        </Button>
                        <Button secondary>
                            <DownloadIcon :size="'1.6rem'" />
                        </Button>
                    </div>
                </div>
                <div class="card-horizontal">
                    <div class="card-horizontal__left">
                        <p class="qr-created__title">Đã yêu cầu lúc 23:30 22 Tháng 4</p>
                        <p class="qr-created__type">Định dạng .jpg</p>
                    </div>
                    <div class="card-horizontal__right">
                        <Button secondary>
                            <DeleteIcon :size="'1.6rem'" />
                        </Button>
                        <Button secondary>
                            <DownloadIcon :size="'1.6rem'" />
                        </Button>
                    </div>
                </div>
            </div>
        </Dropdown>

        <Dropdown :title="'Tạo Qr mới'">
            <form class="qr__form" @submit.prevent="onSubmit">
                <QrCode
                    :text="qrValue"
                    :size="200"
                    :desc="'Khu vực 1 - Bàn 23'"
                    :guide="'Quét mã QR này để gọi món!!'"
                />

                <div class="option__container">
                    <div class="option__container--left">
                        <Select
                            :options="areas"
                            :label="'Khu vực'"
                            :vertical="true"
                            @value="(value) => (form.area = value)"
                        />
                        <Select
                            :options="tables"
                            :label="'Bàn'"
                            :vertical="true"
                            @value="(value) => (form.table = value)"
                        />
                    </div>
                    <div class="option__container--right">
                        <CheckBox :options="checkboxs" @values="setCheckbox" :title="'Tùy chọn kiểu QR'" />
                    </div>
                </div>
                <Button primary>Create</Button>
            </form>
        </Dropdown>
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.qr-created__wrapper {
    @include flex-center();
    flex-direction: column;

    .card-horizontal {
        display: flex;

        justify-content: space-between;

        padding: 8px;
        width: 100%;

        background-color: #fff;
        border-top: 1px solid #ddd;
        .card-horizontal__left {
            display: flex;
            justify-content: center;
            flex-direction: column;
            .qr-created__title {
                font-weight: bold;
            }
            .qr-created__title,
            .qr-created__type {
                margin: 2px;
                font-size: 1.4rem;
            }
        }

        .card-horizontal__right {
        }
    }
}
.qr__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .option__container {
        display: flex;
        justify-content: space-around;
        // align-items: center;

        width: 100%;

        .option__container--left,
        .option__container--right {
            // padding: 16px;
        }
    }
}
</style>
