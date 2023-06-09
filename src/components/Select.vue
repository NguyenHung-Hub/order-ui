<script setup lang="ts">
import { computed } from 'vue';

export interface IOption {
    value: string;
    name: string;
}
interface Props {
    options: IOption[];
    vertical?: boolean;
    label?: string;
    width?: number;
}
const props = withDefaults(defineProps<Props>(), {
    width: 100,
});

const emit = defineEmits<{ (event: 'value', value: string): void }>();
const selectWidth = computed(() => `${props.width}px`);

function onChange(event: any) {
    emit('value', event.target.value);
}
</script>

<template>
    <div class="select__wrapper" :class="{ vertical: vertical }">
        <label v-if="label">{{ label }}</label>
        <select @change="onChange">
            <option v-for="(option, index) in props.options" :key="index" :value="option.value">
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.select__wrapper {
    @include flex-center();
    margin: 4px 2px;

    &.vertical {
        align-items: flex-start;
        flex-direction: column;

        label {
            padding: 2px 0;
        }
    }
    label {
        padding: 0 8px 0 4px;
        font-weight: bold;
        font-size: 1.3rem;
        color: $text-primary;
    }

    select {
        padding: 8px;

        width: v-bind(selectWidth);
        border-radius: 4px;
        background: #fff;
        border: 1px solid $primary3;
        outline: $primary3;
    }
}
</style>
