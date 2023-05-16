<script setup lang="ts">
import Button from '../Button.vue';
import ModalBase from '../ModalBase.vue';
interface Props {
    msg: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'okay' | 'cancel'): void }>();

function emitCloseModal() {
    emit('cancel');
}
function emitConfirm() {
    emit('okay');
}
</script>

<template>
    <ModalBase @on-close="emitCloseModal">
        <span class="message-confirm">{{ props.msg }}</span>
        <div class="container-btn">
            <Button :click="emitConfirm" success> Đồng ý </Button>
            <Button :click="emitCloseModal" danger> Hủy bỏ </Button>
        </div>
    </ModalBase>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.message-confirm {
    margin: 16px 0;

    font-size: 1.6rem;
    color: $text-primary;
}

.container-btn {
    width: 60%;
    @include flex-center();
    justify-content: space-between;
}
</style>
