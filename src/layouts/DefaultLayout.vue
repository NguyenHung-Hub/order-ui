<script setup lang="ts">
import HeaderMobile from '../components/HeaderMobile.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
    <div>
        <HeaderMobile class="header" />
        <router-view class="content"></router-view>
        <Footer class="footer"></Footer>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    z-index: 1;
}

.content {
    position: fixed;
    top: $header-height;
    right: 0;
    left: 0;

    // height: calc(100vh - $header-height - $footer-height);
    overflow: hidden;
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
