<script setup lang="ts">
import { useStore } from 'vuex';
import NotifySimple from '../components/Notify/NotifySimple.vue';
import { ref, watchEffect } from 'vue';
import { INotificationResponse } from '../interfaces/notification.interface';
import ScreenBase from '../components/ScreenBase.vue';

const store = useStore();
const notifications = ref<INotificationResponse[]>();
watchEffect(async () => {
    notifications.value = store.getters['notifications'];
    console.log(`file: NotifyPage.vue:12 > notifications.value:`, notifications.value);
});
</script>

<template>
    <ScreenBase :title="'Thông báo'">
        <div class="wrapper">
            <div class="list" v-for="(notification, index) in notifications" :key="index">
                <NotifySimple
                    :id="notification._id"
                    :content="notification.content"
                    :time="notification.createdAt + ''"
                    :is-read="notification.isRead"
                />
            </div>
        </div>
    </ScreenBase>
</template>

<style scoped lang="scss"></style>
