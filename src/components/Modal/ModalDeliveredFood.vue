<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import InputQuantity from '../InputQuantity.vue';
import ModalBase from '../ModalBase.vue';
import * as invoiceService from '../../services/invoice.service';
import { useStore } from 'vuex';

interface Props {
    invoiceId: string;
    productId: string;
    productName: string;
    table?: string;
    quantity: number;
    done: number;
    delivered: number;
}

const store = useStore();
const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'cancel'): void }>();
const quantityDelivered = ref(0);

function onChangeInput(value: number) {
    quantityDelivered.value = value;
}

function emitOnClose() {
    emit('cancel');
}

async function handleUpdateQuantityDelivered() {
    try {
        const result = await invoiceService.updateQuantityDelivered({
            invoiceId: props.invoiceId,
            productId: props.productId,
            quantity: quantityDelivered.value,
            status: quantityDelivered.value == props.quantity ? 'finish' : 'waitingFood',
        });

        if (result) {
            await store.dispatch('updateInvoiceItemsDelivered', result[0]);
            emitOnClose();
        }
    } catch (error) {
        console.log(`file: ModalDeliveredFood.vue:39 > error:`, error);
    }
}
</script>

<template>
    <ModalBase header @on-close="emitOnClose">
        <div class="modal-body">
            <p class="area">{{ table }}</p>
            <p class="name">{{ productName }}</p>
            <InputQuantity :min="delivered" :max="done" @on-change="onChangeInput" />
        </div>
        <Button success :click="handleUpdateQuantityDelivered">Xong</Button>
    </ModalBase>
</template>

<style scoped lang="scss">
@use '../../styles' as *;

.modal-body {
    @include col-center();
    margin-bottom: 8px;

    .area {
        color: $disable-text-color;
        padding: 8px;
    }
    .name {
        display: block;
        margin-bottom: 8px;
        font-size: 1.6rem;
        font-weight: 500;
        color: $text-primary;
    }
}
</style>
