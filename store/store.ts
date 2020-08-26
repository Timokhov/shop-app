import { createStore, combineReducers, Reducer, CombinedState, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer, { CartState } from './reducers/cart.reducer';
import { ordersReducer, OrdersState } from './reducers/orders.reducer';
import productsReducer, { ProductsState } from './reducers/products.reducer';

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

export const store: Store = createStore(rootReducer);
