<script setup lang="ts">
export interface IconProps {
    size?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    size: '2rem',
    color: '#000',
});
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.3255 5.87122V19.8712" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.3255 12.8712H19.3255" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style scoped lang="scss"></style>
