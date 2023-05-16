<script setup lang="ts"></script>

<template>
    <router-view class="content"></router-view>
</template>

<style scoped lang="scss">
@use "../styles/index" as *;

.content {
    // position: fixed;
    // top: 0;
    // right: 0;
    // left: 0;

    overflow: hidden;
    z-index: 1;
}
</style>
