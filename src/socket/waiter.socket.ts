import AppSocket from './AppSocket';
import { IInvoice, IInvoiceResponse } from '../interfaces/invoice.interface';
import { useStore } from 'vuex';
import store from '../store';

const socket = AppSocket.getInstance({ namespace: 'waiter' });

async function addOrder(data: IInvoiceResponse) {
    await store.dispatch('addOrder', data);
}
export const joinRoomShopWaiter = (shopId: string) => {
    console.log(`joinRoomShopWaiter: `, shopId);
    socket.emit('joinRoomShopWaiter', shopId);
};

export const onGetOrderFromCustomer = () => {
    console.log(`file: waiter.socket.ts:14 > onGetOrderFromCustomer:`, store);
    socket.on('newOrder', (data) => {
        console.log('newOrder:', data);
        addOrder(data);
    });
};

export const emitInvoiceToWaiter = (invoice: IInvoiceResponse) => {
    socket.emit('newInvoiceWaiter', invoice);
};
