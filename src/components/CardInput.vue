<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import EditIcon from '@/components/Icons/EditIcon.vue';
import DeleteIcon from '@/components/Icons/DeleteIcon.vue';
import CrossIcon from '@/components/Icons/CrossIcon.vue';
import CheckIcon from '@/components/Icons/CheckIcon.vue';
import ModalConfirm from './Modal/ModalConfirm.vue';

export interface Props {
    id: string;
    value: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'onUpdate' | 'onDelete', value: Props): void }>();

const inputRef = ref<HTMLInputElement>();
const isHidden = ref<boolean>(false);
const isShowModal = ref<boolean>(false);
const inputValue = ref<string>(props.value);

function setInputShow() {
    isHidden.value = true;
    setTimeout(() => {
        inputRef.value?.focus();
    }, 200);
}
function setInputHidden() {
    isHidden.value = false;
}

function deleteValue() {
    isShowModal.value = true;
}

function updateValue() {
    if (inputValue.value.trim() == '') {
        alert('Not empty!!!');
        inputValue.value = props.value;

        return;
    }

    if (inputValue.value != props.value) {
        emit('onUpdate', { id: props.id, value: inputValue.value.trim() });
    }

    setInputHidden();
}

function cancelEdit() {
    if (inputValue.value.trim() == '') {
        inputValue.value = props.value;
    }
    setInputHidden();
}

function cancelDelete() {
    isShowModal.value = false;
}

function confirmDelete() {
    emit('onDelete', props);
    cancelDelete();
}
</script>

<template>
    <div class="card-input__wrapper">
        <input
            type="text"
            v-if="isHidden"
            class="card-input"
            ref="inputRef"
            v-model="inputValue"
            placeholder="Bàn ..."
        />
        <h4 class="card-label" v-else>{{ inputValue }}</h4>

        <Button secondary :click="setInputShow" v-if="!isHidden">
            <EditIcon :color="`#1fc76a`" />
        </Button>
        <Button secondary v-if="!isHidden" :click="deleteValue">
            <DeleteIcon :color="`#F06966`" />
        </Button>

        <Button secondary :click="updateValue" v-if="isHidden">
            <CheckIcon :color="`#1fc76a`" />
        </Button>
        <Button secondary :click="cancelEdit" v-if="isHidden">
            <CrossIcon :color="`#F06966`" />
        </Button>

        <ModalConfirm :msg="`Xóa '${props.value}'?`" @okay="confirmDelete" @cancel="cancelDelete" v-if="isShowModal" />
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.card-input__wrapper {
    @include flex-center();
    height: fit-content;

    background-color: #ffffff;
    .card-input,
    .card-label {
        flex: 1;
        margin: 0 8px;

        height: 100%;
        padding: 4px;

        font-weight: normal;

        font-size: 1.6rem;
        color: $text-primary;
    }

    .card-input {
        border: none;
        outline: none;
        border-bottom: 1px solid #ddd;

        background: transparent;
    }
}
</style>
