<script setup lang="ts">
import Button from './Button.vue';
import { ref } from 'vue';
import CheckIcon from './Icons/CheckIcon.vue';

interface Props {
    className?: string;
    border?: boolean;
}

const hung = 'sdfsd';
hung.includes('Xám');

const props = withDefaults(defineProps<Props>(), {
    border: false,
});
const isOrder = ref(false);
function setIsOrder() {
    isOrder.value = !isOrder.value;
}
</script>

<template>
    <Button class="btn-order" :click="setIsOrder" :class="[className, border ? 'border' : '']">
        <span v-if="!isOrder">Gọi món</span>
        <span v-else class="ordered">Đã gọi</span>
        <CheckIcon v-if="isOrder" :color="`#1FC76A`" />
    </Button>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.btn-order {
    @include flex-center();

    margin: 0;
    padding: 4px 0;
    height: 30px;

    font-weight: bold;
    color: cornflowerblue;
    user-select: none;
    background: transparent;

    &.border {
        padding: 4px 8px;
        border: 1px solid cornflowerblue;

        &:has(.ordered) {
            border: 1px solid $success;
        }
    }

    .ordered {
        font-style: italic;
        color: $success;
    }
}
</style>
