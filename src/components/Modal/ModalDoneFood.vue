<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import InputQuantity from '../InputQuantity.vue';
import ModalBase from '../ModalBase.vue';
import { IInvoiceItemGroup2, IInvoiceResponse, IUpdateQuantityDone } from '../../interfaces/invoice.interface';
import * as invoiceService from '../../services/invoice.service';
import { useStore } from 'vuex';
import { emitInvoiceItemDone } from '../../socket/waiter.socket';

interface Props {
    dish: IInvoiceItemGroup2;
}

const store = useStore();

const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'cancel'): void }>();
const quantity = ref(0);

function onChangeInput(value: number) {
    quantity.value = value;
}

function emitOnClose() {
    emit('cancel');
}

async function handleUpdateQuantityDone() {
    let quantityDone = quantity.value;
    if (quantityDone == 0) {
        return;
    }

    const updateInvoicesQuantityDone: IUpdateQuantityDone[] = [];
    const productId = props.dish.product._id as string;
    for (let i = 0; i < props.dish.invoiceId.length; i++) {
        const invoiceId = props.dish.invoiceId[i];
        const invoice: IInvoiceResponse = await store.dispatch('getInvoiceServing', invoiceId);

        const findQuantity = invoice.items.filter((i) => i.product._id === productId)[0].quantity;
        if (quantityDone <= findQuantity) {
            updateInvoicesQuantityDone.push({
                invoiceId,
                productId,
                quantity: quantityDone,
                status: quantityDone == findQuantity ? 'finishFood' : 'waitingFood',
            });
            break;
        } else {
            updateInvoicesQuantityDone.push({
                invoiceId,
                productId,
                quantity: quantityDone - (quantityDone - findQuantity),
                status: 'finishFood',
            });

            quantityDone -= findQuantity;
        }
    }

    console.log({ updateInvoicesQuantityDone });

    if (updateInvoicesQuantityDone.length <= 0) {
        return;
    }

    try {
        const result = await invoiceService.updateQuantityDone(updateInvoicesQuantityDone);
        if (result) {
            await store.dispatch('updateInvoiceItemsDone', result);
            emitInvoiceItemDone(result);
            console.log(`file: ModalDoneFood.vue:70 > result:`, result);
        }
        emitOnClose();
    } catch (error) {
        console.log(`file: ModalDoneFood.vue:72 > error:`, error);
    }
}
</script>

<template>
    <ModalBase header @on-close="emitOnClose">
        <div class="modal-body">
            <p class="name">{{ props.dish.product.name }}</p>
            <InputQuantity :min="props.dish.done" :max="props.dish.quantity" @on-change="onChangeInput" />
        </div>
        <Button success :click="handleUpdateQuantityDone">Xong</Button>
    </ModalBase>
</template>

<style scoped lang="scss">
@use '../../styles' as *;

.modal-body {
    @include col-center();
    margin-bottom: 8px;

    .name {
        display: block;
        margin-bottom: 8px;
        font-size: 1.3rem;
        color: $text-primary;
    }
}
</style>
