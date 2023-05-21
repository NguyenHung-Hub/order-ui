<script setup lang="ts">
import CheckCircleIcon from '../Icons/CheckCircleIcon.vue';
import CrossCircleIcon from '../Icons/CrossCircleIcon.vue';
import Loading from '../Loading.vue';
import ModalBase from '../ModalBase.vue';

interface Props {
    status?: 'loading' | 'success' | 'error';
    loadingMsg?: string;
    successMsg?: string;
    errorMsg?: string;
}

const props = withDefaults(defineProps<Props>(), {
    status: 'loading',
    loadingMsg: 'Loading...',
    successMsg: 'Success',
    errorMsg: 'Error...',
});
const emit = defineEmits<{ (event: 'onClose'): void }>();

function emitOnClose() {
    emit('onClose');
}
</script>

<template>
    <Teleport to="body">
        <ModalBase :header="status != 'loading'" @on-close="emitOnClose">
            <div v-if="props.status == 'loading'" class="status__wrapper">
                <Loading />
                <span class="label">{{ loadingMsg }}</span>
            </div>
            <div v-if="props.status == 'success'" class="status__wrapper">
                <CheckCircleIcon />
                <span class="label">{{ successMsg }}</span>
            </div>
            <div v-if="props.status == 'error'" class="status__wrapper">
                <CrossCircleIcon />
                <span class="label">{{ errorMsg }}</span>
            </div>
        </ModalBase>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.status__wrapper {
    @include col-center();

    .label {
        margin: 8px;
        font-size: 1.6rem;
        color: $text-primary;
    }
}
</style>
