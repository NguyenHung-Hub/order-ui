import AppSocket from './AppSocket';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import store from '../store';

const socket = AppSocket.getInstance({ namespace: 'chef' });

async function addOrderServing(data: IInvoiceResponse) {
    await store.dispatch('addInvoiceServing', data);
}

export const joinRoomShopChef = (shopId: string) => {
    console.log(`joinRoomShopChef: `, shopId);
    socket.emit('joinRoomShopChef', shopId);
};

export const onGetOrderFromWaiter = () => {
    socket.on('newOrderChef', (data) => {
        console.log('newOrderChef:', data);
        addOrderServing(data);
    });
};

export const emitInvoiceToChef = (invoice: IInvoiceResponse) => {
    socket.emit('newInvoiceChef', invoice);
};
