import { ExpandedCartItem } from '../../models/cart-item';
import { FirebaseError, FirebaseNameResponse, FirebaseOrdersResponse } from '../../models/firebase';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';

export const loadOrders = (user: Nullable<User>): Promise<FirebaseOrdersResponse> => {
    return fetch(`https://shop-app-72e31.firebaseio.com/orders/${user?.id}.json`)
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((error: FirebaseError) => {
                    throw new Error(error.error);
                });
            }
        });
};

export const createOrder = (items: ExpandedCartItem[], totalAmount: number, date: string, user: Nullable<User>): Promise<FirebaseNameResponse> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/orders/${user?.id}.json?auth=${user?.token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items,
                totalAmount,
                date
            })
        }
    ).then((response: Response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error: FirebaseError) => {
                throw new Error(error.error);
            });
        }
    });
};
