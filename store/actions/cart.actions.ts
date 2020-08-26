import { Action } from 'redux';
import { Product } from '../../models/product';

export enum CartActionType {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    CLEAR_CART = 'CLEAR_CART'
}

export interface CartAction extends Action<CartActionType> {}

export interface AddToCartAction extends CartAction {
    product: Product
}

export interface RemoveFromCartAction extends CartAction {
    productId: string
}

export const addToCart = (product: Product): AddToCartAction => {
    return {
        type: CartActionType.ADD_TO_CART,
        product: product
    };
};

export const removeFromCart = (productId: string): RemoveFromCartAction => {
    return {
        type: CartActionType.REMOVE_FROM_CART,
        productId: productId
    };
};

export const clearCart = (): CartAction => {
    return {
        type: CartActionType.CLEAR_CART
    };
};
