import AppSocket from './AppSocket';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import store from '../store';

const socket = AppSocket.getInstance({ namespace: 'waiter' });

async function addOrder(data: IInvoiceResponse) {
    await store.dispatch('addInvoiceWaiting', data);
}
export const joinRoomShopWaiter = (shopId: string) => {
    console.log(`joinRoomShopWaiter: `, shopId);
    socket.emit('joinRoomShopWaiter', shopId);
};

export const onGetOrderFromCustomer = () => {
    socket.on('newOrder', (data) => {
        console.log('newOrder:', data);
        addOrder(data);
    });
};

export const emitInvoiceToWaiter = (invoice: IInvoiceResponse) => {
    socket.emit('newInvoiceWaiter', invoice);
};
