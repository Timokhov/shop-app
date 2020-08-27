import { PRODUCTS } from '../../data/dummy-data';
import { Product } from '../../models/product';
import { DeleteProductAction, ProductsActions, ProductsActionType } from '../actions/products.actions';

export interface ProductsState {
    availableProducts: Product[],
    userProducts: Product[]
}

const initialState: ProductsState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const onDeleteProduct = (state: ProductsState, action: DeleteProductAction): ProductsState => {
    return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.productId)
    };
};

const productsReducer = (state: ProductsState = initialState, action: ProductsActions): ProductsState => {
    switch (action.type) {
        case ProductsActionType.DELETE_PRODUCT:
           return onDeleteProduct(state, action as DeleteProductAction);
        default:
            return state;
    }
};

export default productsReducer;
