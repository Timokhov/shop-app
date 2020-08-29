import { Action } from 'redux';
import { ExpandedCartItem } from '../../models/cart-item';

export enum OrdersActionType {
    ADD_ORDER = 'ADD_ORDER'
}

export interface OrdersAction extends Action<OrdersActionType> {}

export interface AddOrderAction extends OrdersAction {
    cartItems: ExpandedCartItem[],
    totalAmount: number
}

export const addOrder = (cartItems: ExpandedCartItem[], totalAmount: number): AddOrderAction => {
    return {
        type: OrdersActionType.ADD_ORDER,
        cartItems: cartItems,
        totalAmount: totalAmount
    }
};
