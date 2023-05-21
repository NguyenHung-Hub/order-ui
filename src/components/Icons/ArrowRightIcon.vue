<script setup lang="ts">
export interface IconProps {
    width?: string;
    height?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    width: '2.2rem',
    height: '1.6rem',
    color: '#000',
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 8H19" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 1L21 8L14 15" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style scoped lang="scss"></style>
