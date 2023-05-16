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
    <svg :width="size" :height="size" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.2567 20.5757H21.2567"
            :stroke="color"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M16.7567 4.07573C17.1545 3.6779 17.6941 3.45441 18.2567 3.45441C18.5353 3.45441 18.8111 3.50928 19.0685 3.61588C19.3258 3.72249 19.5597 3.87874 19.7567 4.07573C19.9537 4.27271 20.1099 4.50656 20.2165 4.76393C20.3231 5.0213 20.378 5.29715 20.378 5.57573C20.378 5.8543 20.3231 6.13015 20.2165 6.38752C20.1099 6.64489 19.9537 6.87874 19.7567 7.07573L7.25668 19.5757L3.25668 20.5757L4.25668 16.5757L16.7567 4.07573Z"
            :stroke="color"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<style scoped lang="scss"></style>
