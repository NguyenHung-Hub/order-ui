<script setup lang="ts">
export interface IconProps {
    width?: string;
    height?: string;
}
const props = withDefaults(defineProps<IconProps>(), {
    width: "1.8rem",
    height: "1.8rem",
});
</script>

<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#A0A7BA"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M17.5 17.5L13.875 13.875"
            stroke="#A0A7BA"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<style scoped></style>
