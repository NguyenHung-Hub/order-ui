<script setup lang="ts">
import { formatDate } from '../../utils/format';
import Button from '../Button.vue';
import MoreVertical from '../Icons/MoreVertical.vue';
import * as notificationService from '../../services/notification.service';
import { useStore } from 'vuex';
import { IUpdateStatusNotification } from '../../interfaces/notification.interface';
import { ref } from 'vue';

interface Props {
    id: string;
    content: string;
    time: string;
    isRead: boolean;
}

const store = useStore();
const props = defineProps<Props>();

const isShowOption = ref<boolean>(false);

async function updateStatusRead() {
    try {
        const result = await notificationService.updateStatusRead(props.id, !props.isRead);
        await store.dispatch('updateStatus', { _id: result?._id, isRead: result?.isRead } as IUpdateStatusNotification);

        isShowOption.value = false;
    } catch (error) {
        console.log(`file: NotifySimple.vue:21 > error:`, error);
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="wrapper-left">
            <p class="content">{{ props.content }}</p>
            <p class="time">{{ formatDate(props.time) }}</p>
        </div>

        <div class="wrapper-right">
            <div class="status" v-if="!isRead"></div>
            <div class="option-btn" @click="() => (isShowOption = !isShowOption)">
                <MoreVertical :color="`#888`" />
            </div>
            <div class="option-list" v-if="isShowOption">
                <div class="option-item">
                    <Button class="toggle-seen-btn" :click="updateStatusRead">{{
                        isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'
                    }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.wrapper {
    display: flex;
    justify-content: space-between;

    margin: 4px;
    padding: 8px;

    border-radius: 8px;

    &:hover {
        background-color: $bg-hover;
        cursor: pointer;
    }

    .wrapper-left {
        .content {
            padding-bottom: 8px;
            font-size: 1.4rem;
            font-weight: 400;
            color: $text-primary;
        }
        .time {
            font-style: italic;
        }
    }

    .wrapper-right {
        position: relative;
        @include flex-center();
        .status {
            margin: 0 8px;
            width: 10px;
            height: 10px;
            background-color: $primary;
            border-radius: 50%;
        }

        .option-btn {
            position: relative;
            @include flex-center();

            width: 30px;
            height: 30px;
        }
        .option-list {
            position: absolute;
            top: 110%;
            right: 0;
            background-color: #fff;

            box-shadow: 0px 2px 8px 1px #dbdbdb;
            border-radius: 4px;

            .option-item {
                min-width: 160px;

                .toggle-seen-btn {
                    width: 100%;
                    margin: 0;
                }
            }
        }
    }
}
</style>
