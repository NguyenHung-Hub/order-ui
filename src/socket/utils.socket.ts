import { IUserResponse } from '../interfaces/auth.interface';
import { joinRoomShopChef } from './chef.socket';
import { joinRoomShopManager } from './manager.socket';
import { joinRoomShopWaiter } from './waiter.socket';

export const joinRoomSocket = (user: IUserResponse) => {
    const userId = user._id as string;
    const shopId = user.shop._id;

    switch (user.role.name) {
        case 'manager': {
            joinRoomShopManager({ shopId, userId });
            break;
        }
        case 'chef': {
            joinRoomShopChef(shopId);
            break;
        }
        case 'waiter': {
            joinRoomShopWaiter({ shopId, userId });
            break;
        }

        default:
            break;
    }
};
