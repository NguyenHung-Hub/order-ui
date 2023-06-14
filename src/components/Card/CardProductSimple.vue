<script setup lang="ts">
import { ref } from 'vue';
import { IInvoiceItemGroup2 } from '../../interfaces/invoice.interface';
import ModalDoneFood from '../Modal/ModalDoneFood.vue';
import Button from '../Button.vue';

interface Props {
    data: IInvoiceItemGroup2;
}

const props = defineProps<Props>();
const isShowModal = ref(false);
</script>

<template>
    <span class="card-left"> {{ props.data.product.name }} </span>

    <div class="card-right">
        <span>{{ props.data.done }}/{{ props.data.quantity }}</span>

        <Button primary :click="() => (isShowModal = true)"> Hoàn thành </Button>
    </div>
    <ModalDoneFood :dish="props.data" v-if="isShowModal" @cancel="() => (isShowModal = false)" />
</template>

<style scoped lang="scss">
.card-left {
    font-size: 1.3rem;
}
.card-right {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        padding: 0 8px;
    }
}
</style>
