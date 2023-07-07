import { ActionContext } from 'vuex';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import { INotification, IUpdateStatusNotification } from '../../../interfaces/notification.interface';
import * as notificationService from '../../../services/notification.service';

interface NotificationState {
    notifications: INotification[];
    error: any;
}

const notificationStore: StoreBase = {
    state(): NotificationState {
        return {
            notifications: [],
            error: '',
        };
    },
    mutations: {
        setNotifications(state: NotificationState, notifyPayload: INotification[]) {
            state.notifications = notifyPayload;
        },

        addNotification(state: NotificationState, notify: INotification) {
            state.notifications.push(notify);
        },
        updateStatus(state: NotificationState, data: IUpdateStatusNotification) {
            state.notifications = state.notifications.map((notification) => {
                if (data._id == notification._id) {
                    return { ...notification, isRead: data.isRead };
                }

                return notification;
            });
        },
    },
    actions: {
        async fetchNotify(context: ActionContext<NotificationState, RootState>, userId: string) {
            try {
                const result = await notificationService.get(userId);
                context.commit('setNotifications', result);
            } catch (error) {
                console.log(`file: notification.ts:33 > error:`, error);
                context.commit('setError', error);
            }
        },

        addNotification(context: ActionContext<NotificationState, RootState>, notify: INotification) {
            context.commit('addNotification', notify);
        },

        updateStatus(context: ActionContext<NotificationState, RootState>, data: IUpdateStatusNotification) {
            context.commit('updateStatus', data);
        },
    },

    getters: {
        notifications: (state: NotificationState) => state.notifications,
        countNotification: (state: NotificationState) =>
            state.notifications.reduce((acc, curr) => (curr.isRead ? acc : acc + 1), 0),
    },
};

export default notificationStore;
