import config from '../config';
import { Manager, Socket, io } from 'socket.io-client';

interface Namespace {
    namespace: 'customer' | 'waiter' | 'manager' | 'chef';
}

class AppSocket {
    private static socket: Socket;
    private static manager: Manager;
    private static baseUrl = `ws://${config.DOMAIN}:${config.PORT}`;

    public static getInstance({ namespace = 'customer' }: Namespace) {
        if (!AppSocket.manager) {
            AppSocket.manager = new Manager(AppSocket.baseUrl);
        }

        AppSocket.socket = AppSocket.manager.socket(`/${namespace}`);

        return AppSocket.socket;
    }
}

export default AppSocket;
