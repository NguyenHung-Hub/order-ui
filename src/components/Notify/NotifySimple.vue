<script setup lang="ts">
import { formatDate } from '../../utils/format';

interface Props {
    content: string;
    time: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="wrapper">
        <p class="content">{{ props.content }}</p>
        <p class="time">{{ formatDate(props.time) }}</p>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.wrapper {
    display: flex;
    flex-direction: column;

    margin: 4px;
    padding: 8px;

    border-radius: 8px;

    &:hover {
        background-color: $bg-hover;
        cursor: pointer;
    }

    .content {
        padding-bottom: 8px;
        font-size: 1.4rem;
        font-weight: 400;
        color: $text-primary;
    }
    .time {
        font-style: italic;
    }
}
</style>
