<script setup lang="ts">
import DotHorizontal from './DotHorizontal.vue';

interface Props {
    label?: string;
}

const props = withDefaults(defineProps<Props>(), { label: 'loading' });
</script>

<template>
    <div class="wrapper">
        <p>{{ props.label }}</p>
        <DotHorizontal :size="6" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        &:nth-child(1) {
            font-size: 1.2rem;
        }
    }
}
</style>
