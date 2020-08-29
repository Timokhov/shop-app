import { Order } from '../../models/order';
import { AddOrderAction, OrdersAction, OrdersActionType } from './orders.actions';

export interface OrdersState {
    orders: Order[]
}

const initialState: OrdersState = {
    orders: []
};

const onAddOrder = (state: OrdersState, action: AddOrderAction): OrdersState => {
    const order: Order = new Order(
        new Date().toString(),
        action.cartItems,
        action.totalAmount,
        new Date()
    );

    return {
        ...state,
        orders: state.orders.concat(order)
    };
};

export const ordersReducer = (state: OrdersState = initialState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case OrdersActionType.ADD_ORDER:
            return onAddOrder(state, action as AddOrderAction);
        default:
            return state;
    }
};

