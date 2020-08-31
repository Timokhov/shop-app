import { ExpandedCartItem } from './cart-item';

export interface FirebaseNameResponse {
    name: string
}

export interface FirebaseProductData {
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: string
}

export interface FirebaseOrderData {
    items: ExpandedCartItem[],
    totalAmount: number,
    date: string
}

export type FirebaseProductsResponse = { [index: string]: FirebaseProductData }

export type FirebaseOrdersResponse = { [index: string]: FirebaseOrderData }
