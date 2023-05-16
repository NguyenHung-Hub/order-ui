<script setup lang="ts">
import ArrowLeft from './Icons/ArrowLeft.vue';
import Button from './Button.vue';
import { useRouter } from 'vue-router';

interface Props {
    title?: string;
    bgGray?: boolean;
    fullScreen?: boolean;
    hasFooter?: boolean;
}
const router = useRouter();

const props = withDefaults(defineProps<Props>(), { hasFooter: false });

function back() {
    router.go(-1);
}
</script>

<template>
    <div class="screen__wrapper" :class="[bgGray ? 'bg-gray' : '', fullScreen ? 'full' : '']">
        <div class="screen__head">
            <Button class="back-btn" :click="back">
                <ArrowLeft :color="`#ff964f`" :size="'3rem'" />
            </Button>
            <h2 v-if="props.title" class="title">{{ props.title }}</h2>
        </div>
        <div class="screen__body">
            <div class="screen__body--scroll">
                <slot />
            </div>
        </div>

        <div class="screen__footer" v-if="props.hasFooter">
            <slot name="footer" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.screen__wrapper {
    $head-height: 54px;
    $footer-height: 54px;
    $body-height: calc(100% - $head-height - $footer-height);
    $body-height2: calc(100% - $head-height);

    position: relative;

    width: 100%;
    height: calc(100vh - $footer-height);

    &.full {
        height: 100vh;
    }

    &.bg-gray {
        background: #f0f2f5;
    }
    .screen__head {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        background: #fff;

        height: $head-height;
        box-shadow: 0px 1px 4px -3px rgba(0, 0, 0, 0.75);
        z-index: 2;

        .title {
            color: $text-primary;
        }
    }

    &:has(.screen__footer) {
        .screen__body {
            height: $body-height;
        }
    }
    .screen__body {
        position: absolute;
        top: $head-height;
        left: 0;
        right: 0;

        height: $body-height2;

        z-index: 1;

        .screen__body--scroll {
            width: 100%;
            height: 100%;

            overflow-y: auto;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }

    .screen__footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        height: $footer-height;
        background-color: #fff;

        z-index: 2;
    }
}
</style>
