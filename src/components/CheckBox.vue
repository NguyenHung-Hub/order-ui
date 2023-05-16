<script setup lang="ts">
import { computed } from 'vue';

export interface IOptionCheckBox {
    label: string;
    value: string;
    checked?: boolean;
}
interface Props {
    options: IOptionCheckBox[];
    title?: string;
    vertical?: boolean;
    size?: number;
}

const props = withDefaults(defineProps<Props>(), { vertical: true, size: 16 });

const sizeCheckbox = computed(() => `${props.size}px`);

const emit = defineEmits<{ (event: 'values', values: string[]): void }>();

const checkeds: boolean[] = props.options.map((opt) => opt.checked || false);

function getValues(): string[] {
    const response = checkeds.reduce<Array<string>>((acc, curr, index) => {
        return curr ? [...acc, props.options[index].value] : acc;
    }, []);

    return response;
}

function onChange() {
    // console.log(getValues());

    emit('values', getValues());
}

emit('values', getValues());
</script>

<template>
    <div class="checkbox__wrapper" @change="onChange" :class="{ vertical: props.vertical }">
        <h4 v-if="props.title" class="checkbox__title">{{ props.title }}</h4>
        <label class="label__checkbox" v-for="(option, index) in props.options" :key="index"
            >{{ option.label }}
            <input
                type="checkbox"
                :name="'hung'"
                v-model="checkeds[index]"
                :checked="option?.checked ? true : false"
                :value="option.value"
            />
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<style scoped lang="scss">
@use 'sass:math';
@use '../styles/index' as *;

.checkbox__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 4px 2px;

    &.vertical {
        flex-direction: column;

        .label__checkbox {
            margin: 6px 2px;
        }
    }

    .checkbox__title {
        padding: 2px 0;
        font-size: 1.3rem;
        color: $text-primary;
    }
    .label__checkbox {
        $size-checkbox: 20px;

        display: block;

        position: relative;

        padding-left: calc($size-checkbox + 4px);
        margin: 6px 8px;

        width: fit-content;
        cursor: pointer;
        font-size: 1.4rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        /* Hide the browser's default checkbox */
        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: $size-checkbox;
            width: $size-checkbox;
            background-color: #eee;
            border-radius: 3px;

            /* Style the checkmark/indicator */
            &::after {
                left: round(calc($size-checkbox / 3));
                top: round(calc($size-checkbox / 8));
                width: calc($size-checkbox / 4);
                height: calc($size-checkbox / 2);
                border: solid white;
                $border-with: round(calc($size-checkbox / 8));
                border-width: 0 $border-with $border-with 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }

        /* On mouse-over, add a grey background color */
        &:hover input ~ .checkmark {
            background-color: #ccc;
        }

        /* When the checkbox is checked, add a blue background */
        input:checked ~ .checkmark {
            background-color: #2196f3;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: '';
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        input:checked ~ .checkmark:after {
            display: block;
        }
    }
}
</style>
