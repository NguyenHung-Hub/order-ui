import AppSocket, { IJoinRoomData } from './AppSocket';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import store from '../store';
import { INotifyPrintOrderDone } from '../interfaces/socket.interface';
import { INotification, INotificationResponse } from '../interfaces/notification.interface';

const socket = AppSocket.getInstance({ namespace: 'waiter' });

async function addOrder(data: IInvoiceResponse) {
    await store.dispatch('addInvoiceWaiting', data);
}

async function updateInvoiceItemsDone(data: IInvoiceResponse[]) {
    await store.dispatch('updateInvoiceItemsDone', data);
}

async function addNotification(data: INotification) {
    await store.dispatch('addNotification', data);
}

export const joinRoomShopWaiter = (data: IJoinRoomData) => {
    socket.emit('joinRoomShopWaiter', data);
};

export const onGetOrderFromCustomer = () => {
    socket.on('newOrder', (data) => {
        addOrder(data);
    });
};

export const emitInvoiceToWaiter = (invoice: IInvoiceResponse) => {
    socket.emit('newInvoiceWaiter', invoice);
};

export const onReceiveInvoiceItemDone = () => {
    socket.on('receiveInvoiceItemDone', (data) => {
        updateInvoiceItemsDone(data);
    });

    socket.on('receivePrintOrderDone', (notification: INotification) => {
        console.log(`file: manager.socket.ts:24 > message:`, notification);
        addNotification(notification);
    });

    socket.on('disconnect', (reason) => {
        if (reason == 'io server disconnect' || reason == 'ping timeout' || reason == 'transport close') {
            socket.connect();
        }
    });
};

export const emitInvoiceItemDone = (invoices: IInvoiceResponse[]) => {
    socket.emit('sendInvoiceItemDone', invoices);
};

export const emitPrintOrderDone = (data: INotificationResponse): Promise<string> => {
    return new Promise((resolve, reject) => {
        socket.emit('sendPrintOrderDone', data, (response: any) => {
            resolve(response);
        });
    });
};
