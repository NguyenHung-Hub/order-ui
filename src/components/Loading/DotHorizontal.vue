<script setup lang="ts">
import { computed } from 'vue';
interface Props {
    size: number;
}

const props = withDefaults(defineProps<Props>(), { size: 10 });

const styles = computed(() => {
    return {
        '--size': `${props.size}px`,
        '--size-1': `-${props.size}px`,
    };
});
</script>

<template>
    <div class="wrapper" :style="styles">
        <div class="dot"></div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.wrapper {
    width: calc(var(--size) * 5);
    .dot {
        width: var(--size);
        aspect-ratio: 1;
        background: $primary;
        color: $primary;
        border-radius: 50%;
        animation: d6 0.5s infinite linear alternate;
    }
    @keyframes d6 {
        0% {
            box-shadow: var(--size) 0, calc(var(--size-1) - 4px) 0;
        }
        50% {
            box-shadow: var(--size) 0, calc(var(--size-1)) 0;
        }
        100% {
            box-shadow: calc(var(--size) + 4px) 0, calc(var(--size-1)) 0;
        }
    }
}
</style>
