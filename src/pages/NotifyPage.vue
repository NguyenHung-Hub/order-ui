<script setup lang="ts">
import { useStore } from 'vuex';
import NotifySimple from '../components/Notify/NotifySimple.vue';
import { ref, watchEffect } from 'vue';
import { INotification } from '../interfaces/notification.interface';
import ScreenBase from '../components/ScreenBase.vue';

const store = useStore();
const notifications = ref<INotification[]>();
watchEffect(() => {
    notifications.value = store.getters['notifications'];
});
</script>

<template>
    <ScreenBase :title="'Thông báo'">
        <div class="wrapper">
            <div class="list" v-for="(notification, index) in notifications" :key="index">
                <NotifySimple :content="notification.content" :time="notification.createdAt + ''" />
            </div>
        </div>
    </ScreenBase>
</template>

<style scoped lang="scss"></style>
