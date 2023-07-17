import config from '../config';
import { Manager, Socket, io } from 'socket.io-client';

interface Namespace {
    namespace: 'customer' | 'waiter' | 'manager' | 'chef';
}

export interface IJoinRoomData {
    shopId: string;
    userId: string;
}

class AppSocket {
    private static socket: Socket;
    private static manager: Manager;
    private static baseUrl = config.PROD ? `${config.SOCKET_URL}` : `ws://${config.DOMAIN}:${config.PORT}`;

    public static getInstance({ namespace = 'customer' }: Namespace) {
        if (!AppSocket.manager) {
            AppSocket.manager = new Manager(AppSocket.baseUrl, {
                reconnectionDelay: 5000,
                reconnectionAttempts: 50,
            });
        }

        AppSocket.socket = AppSocket.manager.socket(`/${namespace}`);

        return AppSocket.socket;
    }
}

export default AppSocket;
