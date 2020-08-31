import { ExpandedCartItem } from '../../models/cart-item';
import { FirebaseNameResponse, FirebaseOrdersResponse } from '../../models/firebase';

export const loadOrders = (): Promise<FirebaseOrdersResponse> => {
    return fetch('https://shop-app-72e31.firebaseio.com/orders/u1.json')
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Error');
                throw new Error('Something went wrong');
            }
        });
};

export const createOrder = (items: ExpandedCartItem[], totalAmount: number, date: string): Promise<FirebaseNameResponse> => {
    return fetch(
        'https://shop-app-72e31.firebaseio.com/orders/u1.json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
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
            throw new Error('Something went wrong!');
        }
    });
};
