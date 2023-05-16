<script setup lang="ts">
import ScreenBase from '../components/ScreenBase.vue';
import Input from '../components/Input/Input.vue';
import InputImage from '../components/Input/InputImage.vue';
import Button from '../components/Button.vue';

function nameOnChange(value: string | number) {
    console.log(`file: ModalCreateFood.vue:13 > value:`, value);
}
</script>

<template>
    <ScreenBase :title="'Thêm món mới'">
        <div class="form__food">
            <Input :title="'Món'" @onChange="nameOnChange" />
            <Input :title="'Giá bán'" :value="'1000'" :type="'number'" @onChange="nameOnChange" />
            <Input :title="'Giá gốc'" :value="'1000'" :type="'number'" @onChange="nameOnChange" />
            <Input :title="'Số lượng'" :value="'1'" :type="'number'" @onChange="nameOnChange" />

            <Input :title="'Mô tả'" isTextarea />

            <InputImage />

            <Button primary rounded full middle> Lưu </Button>
        </div>
    </ScreenBase>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.form__food {
    @include col-center();
    width: 100%;
    padding: 8px;

    .input-food {
        padding: 8px;
        margin: 8px 16px;
        width: 100%;
    }
}
</style>
