<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';
import SubtractIcon from './Icons/SubtractIcon.vue';
import PlusIcon from './Icons/PlusIcon.vue';

interface Props {
    size?: number;
    value?: number;
    min?: number;
    max?: number;
}

const props = withDefaults(defineProps<Props>(), { size: 20, value: 0, min: 1, max: 20 });
const emit = defineEmits<{ (event: 'onChange', value: number): void }>();

const sizeInput = computed(() => `${props.size}px`);
const quantity = ref<number>(props.value || props.min);
const input = ref<HTMLInputElement>();

function setIncrease() {
    quantity.value += 1;
}
function setDecrease() {
    quantity.value -= 1;
}

function setQuantity(event: Event) {
    input.value?.blur();
    console.log({ quantity: quantity.value }, input.value);
}

watch(quantity, () => {
    if (quantity.value < props.min) {
        quantity.value = props.min;
    }
    if (quantity.value > props.max) {
        quantity.value = props.max;
    }

    emit('onChange', quantity.value);
});

function focusHandle() {
    input.value?.select();
}
</script>

<template>
    <div class="quantity__wrapper">
        <Button class="quantity-btn" :click="setDecrease">
            <SubtractIcon :color="`#999`" />
        </Button>
        <input
            class="input-quantity"
            type="number"
            v-model="quantity"
            ref="input"
            v-on:keyup.enter="setQuantity"
            @focus="focusHandle"
        />
        <Button class="quantity-btn" :click="setIncrease">
            <PlusIcon :color="`#999`" />
        </Button>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.quantity__wrapper {
    $border: 0.5px solid #bbb;
    $size: v-bind(sizeInput);
    @include flex-center();
    width: fit-content;

    border: $border;

    .quantity-btn {
        @include flex-center();

        width: $size;
        height: 100%;
        padding: 0;
        margin: 0;

        border-radius: 0px;

        &:nth-of-type(1) {
            border-right: $border;
        }
        &:nth-of-type(2) {
            border-left: $border;
        }
    }
    .input-quantity {
        @include square($size);

        font-weight: 300;
        text-align: center;

        border: none;
        outline: none;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }
    }
}
</style>
