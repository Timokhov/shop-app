import { ExpandedCartItem } from '../../models/cart-item';
import { FirebaseNameResponse } from '../../models/firebase';

export const createOrder = (cartItems: ExpandedCartItem[], totalAmount: number, date: string): Promise<FirebaseNameResponse> => {
    return fetch(
        'https://shop-app-72e31.firebaseio.com/orders/u1.json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify({
                cartItems,
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
}