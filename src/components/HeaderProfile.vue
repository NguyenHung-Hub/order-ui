<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import IUser from '../interfaces/auth.interface';

const store = useStore();
const user = ref<IUser>();
watchEffect(() => {
    user.value = store.getters['user'];
});
</script>

<template>
    <div class="header-profile__wrapper">
        <img class="avatar" :src="user?.avatar" alt="" />
        <div class="info__wrapper">
            <div class="info_name">{{ user?.fullName }}</div>
            <div class="info__role">{{ user?.role.name }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.header-profile__wrapper {
    display: flex;
    padding: 8px;

    background-color: $primary3;

    .avatar {
        height: 50px;
        width: 50px;
        object-fit: cover;

        border-radius: 50%;
    }

    .info__wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;

        margin: 4px 8px;

        .info_name,
        .info__role {
            padding: 2px 0;

            text-transform: capitalize;

            font-size: 1.8rem;
            font-weight: bold;
            color: #fff;
        }

        .info__role {
            padding: 2px 8px;
            width: fit-content;

            font-size: 1rem;
            color: $primary3;
            background: #fff;

            border-radius: 24px;
        }
    }
}
</style>
