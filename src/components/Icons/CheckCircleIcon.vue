<script setup lang="ts">
export interface IconProps {
    width?: string;
    height?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    width: '4.8rem',
    height: '4.8rem',
    color: '#1FC76A',
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" :stroke="color" stroke-width="4" />
        <mask id="path-2-inside-1_129_36" fill="white">
            <path d="M27.9706 7L37.8701 16.8995L20.8995 33.8701L11 23.9706L27.9706 7Z" />
        </mask>
        <path
            d="M20.8995 33.8701L17.364 37.4056L20.8995 40.9411L24.435 37.4056L20.8995 33.8701ZM34.3345 13.364L17.364 30.3345L24.435 37.4056L41.4056 20.435L34.3345 13.364ZM24.435 30.3345L14.5356 20.435L7.46448 27.5061L17.364 37.4056L24.435 30.3345Z"
            fill="#1FC76A"
            mask="url(#path-2-inside-1_129_36)"
        />
    </svg>
</template>

<style scoped lang="scss"></style>
