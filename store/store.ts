import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer, { CartState } from './cart/cart.reducer';
import { ordersReducer, OrdersState } from './orders/orders.reducer';
import productsReducer, { ProductsState } from './products/products.reducer';
import { watchProductsSaga } from './products/products.saga';
import { watchOrdersSaga } from './orders/orders.saga';

export interface RootState {
    productsState: ProductsState,
    cartState: CartState,
    ordersState: OrdersState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        productsState: productsReducer,
        cartState: cartReducer,
        ordersState: ordersReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchProductsSaga);
sagaMiddleware.run(watchOrdersSaga);
