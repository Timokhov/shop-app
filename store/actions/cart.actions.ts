import { Action } from 'redux';
import { Product } from '../../models/product';

export enum CartActionType {
    ADD_TO_CART = 'ADD_TO_CART'
}

export interface CartAction extends Action<CartActionType> {}

export interface AddToCartAction extends CartAction {
    product: Product
}

export const addToCart = (product: Product): AddToCartAction => {
    return {
        type: CartActionType.ADD_TO_CART,
        product: product
    };
};
