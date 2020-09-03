import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, AuthState } from './auth/auth.reducer';
import { watchAuthSaga } from './auth/auth.saga';
import cartReducer, { CartState } from './cart/cart.reducer';
import { ordersReducer, OrdersState } from './orders/orders.reducer';
import productsReducer, { ProductsState } from './products/products.reducer';
import { watchProductsSaga } from './products/products.saga';
import { watchOrdersSaga } from './orders/orders.saga';

export interface RootState {
    productsState: ProductsState,
    cartState: CartState,
    ordersState: OrdersState,
    authState: AuthState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        productsState: productsReducer,
        cartState: cartReducer,
        ordersState: ordersReducer,
        authState: authReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchProductsSaga);
sagaMiddleware.run(watchOrdersSaga);
sagaMiddleware.run(watchAuthSaga);
