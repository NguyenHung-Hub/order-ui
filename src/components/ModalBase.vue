<script setup lang="ts">
import Button from './Button.vue';
import CrossIcon from './Icons/CrossIcon.vue';

interface Props {
    header?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'onClose', value: boolean): void }>();
function emitCloseModal() {
    emit('onClose', true);
}
</script>

<template>
    <Teleport to="body">
        <div class="overlay__wrapper">
            <div class="modal__container">
                <div class="modal__header" v-if="props.header">
                    <Button class="modal__header--btn" :click="emitCloseModal">
                        <CrossIcon />
                    </Button>
                </div>
                <div class="modal__body">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.overlay__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    @include flex-center();

    background: rgba($color: #000000, $alpha: 0.3);
    backdrop-filter: blur(4px);
    z-index: 100;

    .modal__container {
        padding: 8px;

        width: min(300px, calc(80%));

        background-color: #fff;

        border-radius: 8px;
        .modal__header {
            display: flex;
            justify-content: flex-end;

            margin-bottom: 8px;

            .modal__header--btn {
                margin: 0;
                padding: 0;
            }
        }
        .modal__body {
            @include col-center();

            width: 100%;
        }
    }
}
</style>
