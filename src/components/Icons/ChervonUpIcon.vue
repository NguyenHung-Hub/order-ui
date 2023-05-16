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
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style scoped lang="scss"></style>
