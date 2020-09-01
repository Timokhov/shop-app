import {
    FirebaseError,
    FirebaseNameResponse,
    FirebaseProductsResponse
} from '../../models/firebase';
import { User } from '../../models/user';

export const loadProducts = (): Promise<FirebaseProductsResponse> => {
    return fetch('https://shop-app-72e31.firebaseio.com/products.json')
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

export const createProduct = (title: string, imageUrl: string, description: string, price: number, user: User): Promise<FirebaseNameResponse> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/products.json?auth=${user.token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: user.id,
                title,
                imageUrl,
                description,
                price
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

export const updateProduct = (productId: string, title: string, imageUrl: string, description: string, user: User): Promise<FirebaseNameResponse> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/products/${productId}.json?auth=${user.token}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
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

export const deleteProduct = (productId: string, user: User): Promise<any> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/products/${productId}.json?auth=${user.token}`,
        {
            method: 'DELETE'
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
