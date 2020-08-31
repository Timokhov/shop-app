import { HttpState } from '../../models/http-state';
import { Order } from '../../models/order';
import {
    CreateOrderFailAction,
    CreateOrderSuccessAction,
    LoadOrdersFailAction,
    LoadOrdersSuccessAction,
    OrdersAction,
    OrdersActionType
} from './orders.actions';

export interface OrdersState {
    orders: Order[],
    loadOrdersHttpState: HttpState,
    createOrderHttpState: HttpState
}

const initialState: OrdersState = {
    orders: [],
    loadOrdersHttpState: {
        requestInProgress: false,
        error: ''
    },
    createOrderHttpState: {
        requestInProgress: false,
        error: ''
    }
};

const onLoadOrdersStart = (state: OrdersState, action: OrdersAction): OrdersState => {
    return {
        ...state,
        loadOrdersHttpState: {
            requestInProgress: true,
            error: ''
        }
    }
};

const onLoadOrdersSuccess = (state: OrdersState, action: LoadOrdersSuccessAction): OrdersState => {
    return {
        ...state,
        orders: action.orders,
        loadOrdersHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onLoadOrdersFail = (state: OrdersState, action: LoadOrdersFailAction): OrdersState => {
    return {
        ...state,
        orders: [],
        loadOrdersHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
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
        case OrdersActionType.LOAD_ORDERS_START:
            return onLoadOrdersStart(state, action);
        case OrdersActionType.LOAD_ORDERS_SUCCESS:
            return onLoadOrdersSuccess(state, action as LoadOrdersSuccessAction);
        case OrdersActionType.LOAD_ORDERS_FAIL:
            return onLoadOrdersFail(state, action as LoadOrdersFailAction);
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

