import { Action } from 'redux';
import { ExpandedCartItem } from '../../models/cart-item';
import { Order } from '../../models/order';

export enum OrdersActionType {
    CREATE_ORDER = 'CREATE_ORDER',
    CREATE_ORDER_START = 'CREATE_ORDER_START',
    CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
    CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL'
}

export interface OrdersAction extends Action<OrdersActionType> {}

export interface CreateOrderAction extends OrdersAction {
    cartItems: ExpandedCartItem[],
    totalAmount: number
}

export interface CreateOrderSuccessAction extends OrdersAction {
    order: Order
}

export interface CreateOrderFailAction extends OrdersAction {
    error: string
}

export const createOrder = (cartItems: ExpandedCartItem[], totalAmount: number): CreateOrderAction => {
    return {
        type: OrdersActionType.CREATE_ORDER,
        cartItems: cartItems,
        totalAmount: totalAmount
    };
};

export const createOrderStart = (): OrdersAction => {
    return {
        type: OrdersActionType.CREATE_ORDER_START
    };
};

export const createOrderSuccess = (order: Order): CreateOrderSuccessAction => {
    return {
        type: OrdersActionType.CREATE_ORDER_SUCCESS,
        order: order
    };
};

export const createOrderFail = (error: string): CreateOrderFailAction => {
    return {
        type: OrdersActionType.CREATE_ORDER_FAIL,
        error: error
    };
};
