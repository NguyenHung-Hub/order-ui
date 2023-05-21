<script setup lang="ts">
export interface IconProps {
    size?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    size: '4.8rem',
    color: '#FF6961',
});
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="21.5" :stroke="color" stroke-width="5" />
        <path d="M12 33.2132L33.2132 12L36.7487 15.5355L15.5355 36.7487L12 33.2132Z" fill="#FF6961" />
        <rect x="15.5355" y="12.2132" width="30" height="5" transform="rotate(45 15.5355 12.2132)" fill="#FF6961" />
    </svg>
</template>

<style scoped lang="scss"></style>
