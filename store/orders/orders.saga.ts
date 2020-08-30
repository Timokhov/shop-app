import { put, takeEvery } from 'redux-saga/effects';
import * as OrdersActions from './orders.actions';
import * as OrdersService from '../../services/orders/orders.service';
import { CreateOrderAction, OrdersActionType } from './orders.actions';
import { FirebaseNameResponse } from '../../models/firebase';
import { Order } from '../../models/order';

export function* watchOrdersSaga() {
    yield takeEvery(OrdersActionType.CREATE_ORDER, createOrderSaga);
}

function* createOrderSaga(action: CreateOrderAction) {
    yield put(OrdersActions.createOrderStart());
    try {
        const orderDate: Date = yield new Date();
        const response: FirebaseNameResponse = yield OrdersService.createOrder(
            action.cartItems,
            action.totalAmount,
            yield orderDate.toISOString
        );
        yield put(OrdersActions.createOrderSuccess(
            new Order(
                response.name,
                action.cartItems,
                action.totalAmount,
                orderDate
            )
        ));
    } catch (error) {
        yield put(OrdersActions.createOrderFail('Something went wrong!'));
    }
}