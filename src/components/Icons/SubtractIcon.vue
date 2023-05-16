<script setup lang="ts">
export interface IconProps {
    size?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    size: '1.6rem',
    color: '#000',
});
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style scoped lang="scss"></style>
