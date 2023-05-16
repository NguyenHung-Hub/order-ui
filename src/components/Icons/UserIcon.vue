<script setup lang="ts">
export interface IconProps {
    width?: string;
    height?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    width: "2rem",
    height: "2rem",
});
</script>

<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 54 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="26.6667" cy="13.3333" r="13.3333" fill="#70DEB1" />
        <path
            opacity="0.4"
            d="M53.3333 44.6667C53.3333 52.9509 53.3333 59.6667 26.6667 59.6667C0 59.6667 0 52.9509 0 44.6667C0 36.3824 11.9391 29.6667 26.6667 29.6667C41.3943 29.6667 53.3333 36.3824 53.3333 44.6667Z"
            fill="#70DEB1"
        />
    </svg>
</template>

<style scoped lang="scss"></style>
