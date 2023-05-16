<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

interface Props {
    to?: string;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
    className?: string;
    outline?: boolean;
    vertical?: boolean;
    rounded?: boolean;
    middle?: boolean;
    full?: boolean;
    click?: Function;
}

const props = defineProps<Props>();
const router = useRouter();

function Click() {
    if (props?.click) {
        props.click();
    } else if (props?.to) {
        router.push(props.to);
    }
}
</script>

<template>
    <button
        class="btn-wrapper"
        :class="[
            primary ? 'primary' : '',
            secondary ? 'secondary' : '',
            success ? 'success' : '',
            danger ? 'danger' : '',
            outline ? 'outline' : '',
            vertical ? 'vertical' : '',
            rounded ? 'rounded' : '',
            full ? 'full' : '',
            middle ? 'middle' : '',
            className,
        ]"
        @click="Click"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use '../styles/index' as *;
.btn-wrapper {
    @include flex-center();

    padding: 6px 12px;
    margin: 4px;
    background: #fff;
    border-radius: 4px;

    border: none;

    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: $press-color;
    }

    &.btn-icon {
    }

    &:has(.btn-icon) {
        padding: 2px;
        margin: 0;

        background: transparent;
    }

    &.primary,
    &.success,
    &.danger {
        color: #fff;
        font-weight: bold;
    }
    &.primary {
        color: #fff;
        font-weight: bold;

        background: $primary;
    }
    &.secondary {
        font-weight: bold;
        background: $secondary;
    }
    &.success {
        font-weight: bold;
        background: $success;
    }
    &.danger {
        background: $danger;
    }
    &.outline {
        border: 1px solid #ccc;
    }

    &.vertical {
        @include flex-center();
        justify-content: space-evenly;
        flex-direction: column;
    }

    &.rounded {
        border-radius: 30px;
    }

    &.full {
        width: 100%;
    }

    &.middle {
        padding: 8px 16px;
        font-size: 1.6rem;
    }
}
</style>
