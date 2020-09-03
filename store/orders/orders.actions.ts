import { Action } from 'redux';
import { ExpandedCartItem } from '../../models/cart-item';
import { Nullable } from '../../models/nullable';
import { Order } from '../../models/order';
import { User } from '../../models/user';

export enum OrdersActionType {
    LOAD_ORDERS = 'LOAD_ORDERS',
    LOAD_ORDERS_START = 'LOAD_ORDERS_START',
    LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS',
    LOAD_ORDERS_FAIL = 'LOAD_ORDERS_FAIL',

    CREATE_ORDER = 'CREATE_ORDER',
    CREATE_ORDER_START = 'CREATE_ORDER_START',
    CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
    CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL'
}

export interface OrdersAction extends Action<OrdersActionType> {}

export interface LoadOrdersAction extends OrdersAction {
    user: Nullable<User>
}

export interface LoadOrdersSuccessAction extends OrdersAction {
    orders: Order[]
}

export interface LoadOrdersFailAction extends OrdersAction {
    error: string
}

export interface CreateOrderAction extends OrdersAction {
    cartItems: ExpandedCartItem[],
    totalAmount: number,
    user: Nullable<User>
}

export interface CreateOrderSuccessAction extends OrdersAction {
    order: Order
}

export interface CreateOrderFailAction extends OrdersAction {
    error: string
}

export const loadOrders = (user: Nullable<User>): LoadOrdersAction => {
    return {
        type: OrdersActionType.LOAD_ORDERS,
        user: user
    };
};

export const loadOrdersStart = (): OrdersAction => {
    return {
        type: OrdersActionType.LOAD_ORDERS_START
    };
};

export const loadOrdersSuccess = (orders: Order[]): LoadOrdersSuccessAction => {
    return {
        type: OrdersActionType.LOAD_ORDERS_SUCCESS,
        orders: orders
    };
};

export const loadOrdersFail = (error: string): LoadOrdersFailAction => {
    return {
        type: OrdersActionType.LOAD_ORDERS_FAIL,
        error: error
    };
};

export const createOrder = (cartItems: ExpandedCartItem[], totalAmount: number, user: Nullable<User>): CreateOrderAction => {
    return {
        type: OrdersActionType.CREATE_ORDER,
        cartItems: cartItems,
        totalAmount: totalAmount,
        user: user
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
