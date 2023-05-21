<script setup lang="ts">
interface Props {
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
}
const props = defineProps<Props>();
</script>

<template>
    <div
        class="loading__spinner"
        :class="[secondary ? 'secondary' : '', success ? 'success' : '', danger ? 'danger' : '']"
    >
        <div class="spinner"></div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.spinner {
    width: 48px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: $primary;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: s3 1s infinite linear;

    &.secondary {
        background: $secondary;
    }
    &.success {
        background: $success;
    }
    &.danger {
        background: $danger;
    }
}
@keyframes s3 {
    to {
        transform: rotate(1turn);
    }
}
</style>
