import AppSocket from './AppSocket';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import store from '../store';

const socket = AppSocket.getInstance({ namespace: 'waiter' });

async function addOrder(data: IInvoiceResponse) {
    await store.dispatch('addInvoiceWaiting', data);
}

async function updateInvoiceItemsDone(data: IInvoiceResponse[]) {
    await store.dispatch('updateInvoiceItemsDone', data);
}
export const joinRoomShopWaiter = (shopId: string) => {
    socket.emit('joinRoomShopWaiter', shopId);
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
};

export const emitInvoiceItemDone = (invoices: IInvoiceResponse[]) => {
    socket.emit('sendInvoiceItemDone', invoices);
};
