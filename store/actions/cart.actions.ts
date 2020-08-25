import { Action } from 'redux';
import { Product } from '../../models/product';

export enum CartActionType {
    ADD_TO_CART = 'ADD_TO_CART'
}

export interface CartAction extends Action<CartActionType> {}

export class AddToCartAction implements CartAction {
    type: CartActionType = CartActionType.ADD_TO_CART;

    constructor(
        public product: Product
    ) {}
}

export const addToCart = (product: Product): AddToCartAction => {
    return new AddToCartAction(product);
};
