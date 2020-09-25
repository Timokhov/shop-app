import { CartItem } from './cart-item';

export interface FirebaseNameResponse {
    name: string
}

export interface FirebaseProductData {
    ownerId: string,
    ownerPushToken: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export interface FirebaseOrderData {
    items: CartItem[],
    totalAmount: number,
    date: string
}

export type FirebaseProductsResponse = { [index: string]: FirebaseProductData }

export type FirebaseOrdersResponse = { [index: string]: FirebaseOrderData }

export interface FirebaseUserData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface FirebaseError {
    error: string
}

export interface FirebaseAuthError {
    error: {
        message: string
    }
}
