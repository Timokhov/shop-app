import { put, takeEvery } from 'redux-saga/effects';
import * as OrdersActions from './orders.actions';
import * as OrdersService from '../../services/orders/orders.service';
import * as NotificationService from '../../services/notification/notofication.service';
import { CreateOrderAction, LoadOrdersAction, OrdersActionType } from './orders.actions';
import { FirebaseNameResponse, FirebaseOrderData, FirebaseOrdersResponse } from '../../models/firebase';
import { Order } from '../../models/order';
import { Nullable } from '../../models/nullable';

export function* watchOrdersSaga() {
    yield takeEvery(OrdersActionType.LOAD_ORDERS, loadOrdersSaga);
    yield takeEvery(OrdersActionType.CREATE_ORDER, createOrderSaga);
}

function* loadOrdersSaga(action: LoadOrdersAction) {
    yield put(OrdersActions.loadOrdersStart());
    try {
        const response: FirebaseOrdersResponse = yield OrdersService.loadOrders(action.user);
        if (response) {
            const orders: Order[] = yield Object.keys(response).map(id => {
                const orderData: FirebaseOrderData = response[id];
                return new Order(
                    id,
                    orderData.items,
                    orderData.totalAmount,
                    new Date(orderData.date)
                )
            });
            yield put(OrdersActions.loadOrdersSuccess(orders));
        } else {
            yield put(OrdersActions.loadOrdersSuccess([]));
        }
    } catch (error) {
        yield put(OrdersActions.loadOrdersFail(error.message));
    }
}

function* createOrderSaga(action: CreateOrderAction) {
    yield put(OrdersActions.createOrderStart());
    try {
        const orderDate: Date = yield new Date();
        const response: FirebaseNameResponse = yield OrdersService.createOrder(
            action.cartItems,
            action.totalAmount,
            orderDate.toISOString(),
            action.user
        );
        yield put(OrdersActions.createOrderSuccess(
            new Order(
                response.name,
                action.cartItems,
                action.totalAmount,
                orderDate
            )
        ));
        action.cartItems.forEach(cartItem => {
            const pushToken: Nullable<string> = cartItem.product.ownerPushToken;
            if (pushToken) {
                NotificationService.notify(
                    pushToken,
                    'Order was placed!',
                    `Your product '${cartItem.product.title}' was ordered.`
                );
            }
        });
    } catch (error) {
        yield put(OrdersActions.createOrderFail(error.message));
    }
}
