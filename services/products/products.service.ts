import { FirebaseNameResponse, FirebaseProductsResponse } from '../../models/firebase';

export const loadProducts = (): Promise<FirebaseProductsResponse> => {
    return fetch('https://shop-app-72e31.firebaseio.com/products.json')
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        });
};

export const createProduct = (ownerId: string, title: string, imageUrl: string, description: string, price: string): Promise<FirebaseNameResponse> => {
    return fetch(
        'https://shop-app-72e31.firebaseio.com/products.json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify({
                ownerId,
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
            throw new Error('Something went wrong!');
        }
    });
};

export const updateProduct = (productId: string, ownerId: string, title: string, imageUrl: string, description: string): Promise<FirebaseNameResponse> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/products/${productId}.json`,
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
            throw new Error('Something went wrong!');
        }
    });
};

export const deleteProduct = (productId: string): Promise<any> => {
    return fetch(
        `https://shop-app-72e31.firebaseio.com/products/${productId}.json`,
        {
            method: 'DELETE'
        }
    ).then((response: Response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong!');
        }
    });
};