<script setup lang="ts">
import Footer from '../components/Footer.vue';
</script>

<template>
    <div>
        <router-view class="content"></router-view>
        <Footer class="footer" />
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // overflow: hidden;
    z-index: 1;
}

.footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;

    z-index: 1;
}
</style>
