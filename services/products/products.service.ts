import { FirebasePostResponse, FirebaseProductsResponse } from '../../models/firebase';

export const createProduct = (ownerId: string, title: string, imageUrl: string, description: string, price: string): Promise<FirebasePostResponse> => {
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
    ).then((response: Response) => response.json());
};

export const loadProducts = (): Promise<FirebaseProductsResponse> => {
    return fetch('https://shop-app-72e31.firebaseio.com/products.json')
        .then((response: Response) => response.json());
};