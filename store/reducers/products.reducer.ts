import { Product } from '../../models/product';
import { ProductsActions } from '../actions/products.actions';
import { PRODUCTS } from '../../data/dummy-data';

export interface ProductsState {
    availableProducts: Product[],
    userProducts: Product[]
}

const initialState: ProductsState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const productsReducer = (state: ProductsState = initialState, action: ProductsActions): ProductsState => {
    return state;
};

export default productsReducer;