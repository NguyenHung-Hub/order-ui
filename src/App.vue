<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import HeaderMobile from "./components/HeaderMobile.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="main-wrapper">
        <router-view class="content"></router-view>
    </div>
</template>

<style scoped lang="scss">
@use "./styles/index" as *;

.main-wrapper {
    position: relative;
    width: 100%;

    .header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;

        z-index: 1;
    }

    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        z-index: 1;
    }
}
</style>
