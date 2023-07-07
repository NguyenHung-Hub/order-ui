<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    content: string;
    timeout: number;
}

const props = withDefaults(defineProps<Props>(), { timeout: 5000 });
const isShow = ref<boolean>(false);

function showToast() {
    isShow.value = true;
    setTimeout(() => {
        isShow.value = false;
    }, props.timeout);
}

defineExpose({ showToast });
</script>

<template>
    <Teleport to="body">
        <div class="toast__wrapper" v-if="isShow">
            <p class="toast-content">{{ content }}</p>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.toast__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .toast-content {
        padding: 8px 16px;

        width: fit-content;
        background: rgba($color: #000000, $alpha: 0.4);
        border-radius: 8px;

        font-size: 1.3rem;
        color: #fff;
    }
}
</style>
