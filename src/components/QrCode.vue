<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateQR } from '../utils/QrCode';

interface Props {
    text: string;
    size?: number;
    guide?: string;
    desc?: string;
    shadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 100,
    shadow: false,
});

const qrImg = ref<string | undefined>('https://dntech.vn/uploads/details/2021/11/images/ai%20l%C3%A0%20g%C3%AC.jpg');

(async function setImage() {
    const res: string | undefined = await generateQR(props.text);
    qrImg.value = res;
})();

const size2 = computed(() => `${props.size}px`);
</script>

<template>
    <div class="qr__wrapper" :class="[shadow ? 'shadow' : '']">
        <p v-if="props.guide" class="qr__guide">{{ props.guide }}</p>
        <div class="qr-img__wrapper">
            <div class="logo__wrapper">
                <img
                    class="logo-img"
                    src="https://t3.ftcdn.net/jpg/03/66/03/60/360_F_366036054_Lm4VjnOHAN48s6XLNu5JsDoIIhZX7QkJ.jpg"
                    alt=""
                />
            </div>
            <img class="qr-img" :src="qrImg" alt="" />
        </div>
        <p v-if="props.desc" class="qr__label">{{ props.desc }}</p>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.qr__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 4px;
    padding: 8px;

    width: fit-content;
    height: fit-content;

    border-radius: 4px;
    background-color: #fff;

    overflow: hidden;

    &.shadow {
        box-shadow: 0px 1px 6px -3px rgba(0, 0, 0, 0.75);
    }

    .qr-img__wrapper {
        position: relative;
        @include flex-center();

        .logo__wrapper {
            $logo-size: 30px;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            @include flex-center();

            width: calc($logo-size + 10px);
            height: calc($logo-size + 10px);

            background-color: #fff;
            border-radius: 50%;

            z-index: 2;

            .logo-img {
                @include circle($logo-size);
            }
        }

        .qr-img {
            position: relative;
            width: min(v-bind(size2), 160px);
            height: min(v-bind(size2), 160px);
            object-fit: cover;
            z-index: 1;
        }
    }
    .qr__guide,
    .qr__label {
        font-weight: bold;
        font-size: 1.4rem;
        color: $text-primary;
    }
}
</style>
