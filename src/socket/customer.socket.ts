import AppSocket from './AppSocket';

const socket = AppSocket.getInstance({ namespace: 'customer' });

export const orderingTheMeal = (invoiceId: string) => {
    socket.emit('orderingTheMeal', invoiceId);
};
