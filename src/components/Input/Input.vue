<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface Props {
    type?: 'text' | 'number' | 'email' | 'password';
    title: string;
    value?: string;
    isTextarea?: boolean;
    rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    title: 'Input',
    value: '',
    isTextarea: false,
    rows: 4,
});

const emit = defineEmits<{ (event: 'onChange', value: string): void }>();
const inputText = ref<string>(props.value);
const inputRef = ref<HTMLInputElement>();

watch(inputText, () => {
    emitInputValue();
});

onMounted(() => {
    inputRef.value?.focus();
});

function emitInputValue() {
    emit('onChange', inputText.value);
}
</script>

<template>
    <div class="input__wrapper">
        <div class="box">
            <textarea v-if="isTextarea" :rows="props.rows" class="input" v-model="inputText" placeholder=" "></textarea>
            <input v-else :type="props.type" ref="inputRef" class="input" v-model="inputText" placeholder=" " />

            <p class="label">{{ props.title }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.input__wrapper {
    width: 100%;
    margin: 8px;
    .box {
        position: relative;

        .input {
            width: 100%;
            position: relative;
            padding: 10px;

            font-size: 1.6rem;
            background: transparent;
            color: $text-primary;

            border: 0.5px solid #ccc;
            outline: 0.5px solid #ccc;

            border-radius: 4px;

            resize: none;
            z-index: 2;

            &:not(:placeholder-shown) + .label,
            &:focus + .label {
                top: 0;

                color: $primary3;
                z-index: 3;
            }
        }
        .label {
            position: absolute;
            top: 50%;
            left: 8px;
            padding: 0 2px;

            font-size: 1.4rem;
            color: #ccc;
            font-weight: 400;

            background-color: #fff;
            transform: translateY(-50%);
            user-select: none;
            transition: all 0.3s;
            z-index: 1;
        }
    }
}
</style>
