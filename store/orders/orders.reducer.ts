import { Order } from '../../models/order';
import {
    OrdersAction,
    OrdersActionType,
    CreateOrderSuccessAction,
    CreateOrderFailAction
} from './orders.actions';
import { HttpState } from '../../models/http-state';

export interface OrdersState {
    orders: Order[],
    createOrderHttpState: HttpState
}

const initialState: OrdersState = {
    orders: [],
    createOrderHttpState: {
        requestInProgress: false,
        error: ''
    }
};

const onCreateOrderStart = (state: OrdersState, action: OrdersAction): OrdersState => {
    return {
        ...state,
        createOrderHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onCreateOrderSuccess = (state: OrdersState, action: CreateOrderSuccessAction): OrdersState => {
    return {
        ...state,
        orders: state.orders.concat(action.order),
        createOrderHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onCreateOrderFail = (state: OrdersState, action: CreateOrderFailAction): OrdersState => {
    return {
        ...state,
        createOrderHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

export const ordersReducer = (state: OrdersState = initialState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case OrdersActionType.CREATE_ORDER_START:
            return onCreateOrderStart(state, action);
        case OrdersActionType.CREATE_ORDER_SUCCESS:
            return onCreateOrderSuccess(state, action as CreateOrderSuccessAction);
        case OrdersActionType.CREATE_ORDER_FAIL:
            return onCreateOrderFail(state, action as CreateOrderFailAction);
        default:
            return state;
    }
};

