<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import ChervonDownIcon from './Icons/ChervonDownIcon.vue';
import ChervonUpIcon from './Icons/ChervonUpIcon.vue';

interface Props {
    title?: string;
    isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
});
const toggle = ref<boolean>(props.isOpen);
</script>

<template>
    <div class="dropdown__wrapper">
        <div class="dropdown__wrapper--head">
            <h3 v-if="props.title" class="dropdown__title">{{ props.title }}</h3>
            <Button :click="() => (toggle = !toggle)">
                <ChervonUpIcon v-if="toggle" />
                <ChervonDownIcon v-else />
            </Button>
        </div>
        <div class="dropdown__wrapper--body" :class="{ active: toggle }">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.dropdown__wrapper {
    margin: 8px;
    background-color: #fff;

    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;

    .dropdown__wrapper--head {
        @include flex-center();
        justify-content: space-between;

        background-color: #fff;
        border-bottom: 1px solid #ddd;

        .dropdown__title {
            padding: 16px 10px;
            font-size: 1.4rem;
        }
    }

    .dropdown__wrapper--body {
        display: none;
        &.active {
            display: block;
        }
    }
}
</style>
