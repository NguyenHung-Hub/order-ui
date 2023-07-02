import { ActionContext } from 'vuex';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import { INotification } from '../../../interfaces/notification.interface';

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
    },
    actions: {
        fetchNotify(context: ActionContext<NotificationState, RootState>, userId: string) {},

        addNotification(context: ActionContext<NotificationState, RootState>, notify: INotification) {
            context.commit('addNotification', notify);
        },
    },

    getters: {
        notifications: (state: NotificationState) => state.notifications,
        countNotification: (state: NotificationState) => state.notifications.length,
    },
};

export default notificationStore;
