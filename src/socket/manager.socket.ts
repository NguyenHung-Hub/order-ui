import AppSocket, { IJoinRoomData } from './AppSocket';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import store from '../store';
import { INotifyPrintOrderDone } from '../interfaces/socket.interface';

const socket = AppSocket.getInstance({ namespace: 'manager' });

async function addInvoiceDelivered(data: IInvoiceResponse) {
    await store.dispatch('addInvoiceWaiting', data);
}

export const joinRoomShopManager = (data: IJoinRoomData) => {
    console.log(`file: manager.socket.ts:12 > shopId:`, data.shopId);
    socket.emit('joinRoomShopManager', data);
};

export const onGetInvoicePrint = () => {
    socket.on('receiveInvoicePrint', (invoice: IInvoiceResponse) => {
        console.log(`file: manager.socket.ts:17 > invoice:`, invoice);
        addInvoiceDelivered(invoice);
    });

    socket.on('disconnect', (reason) => {
        if (reason == 'io server disconnect') {
            socket.connect();
        }
    });
};

export const emitInvoicePrint = (invoice: IInvoiceResponse) => {
    socket.emit('sendInvoicePrint', invoice);
};

export const emitInvoiceItemDone = (invoices: IInvoiceResponse[]) => {
    socket.emit('sendInvoiceItemDone', invoices);
};
