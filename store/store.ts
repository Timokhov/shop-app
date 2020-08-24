import { createStore, combineReducers, Reducer, CombinedState, Store } from 'redux';
import productsReducer, { ProductsState } from './reducers/products.reducer';

export interface RootState {
    productsState: ProductsState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        productsState: productsReducer
    }
);

export const store: Store = createStore(rootReducer);