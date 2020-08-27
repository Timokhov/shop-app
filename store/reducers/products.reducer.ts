import { PRODUCTS } from '../../data/dummy-data';
import { Product } from '../../models/product';
import {
    CreateProductAction,
    DeleteProductAction,
    ProductsActions,
    ProductsActionType,
    UpdateProductAction
} from '../actions/products.actions';

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

const onCreateProduct = (state: ProductsState, action: CreateProductAction): ProductsState => {
    const newProduct: Product = new Product(
        new Date().toString(),
        'u1',
        action.title,
        action.imageUrl,
        action.description,
        +action.price
    );
    return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
    };
};

const onUpdateProduct = (state: ProductsState, action: UpdateProductAction): ProductsState => {
    const userProductIndex: number = state.userProducts.findIndex(product => product.id === action.productId);
    const updatedProduct: Product = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        action.title,
        action.imageUrl,
        action.description,
        state.userProducts[userProductIndex].price
    );

    const updatedUserProducts: Product[] = [...state.userProducts];
    updatedUserProducts[userProductIndex] = updatedProduct;

    const availableProductIndex: number = state.availableProducts.findIndex(product => product.id === action.productId);
    const updatedAvailableProducts: Product[] = [...state.availableProducts];
    updatedAvailableProducts[availableProductIndex] = updatedProduct;

    return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
    };
};

const productsReducer = (state: ProductsState = initialState, action: ProductsActions): ProductsState => {
    switch (action.type) {
        case ProductsActionType.DELETE_PRODUCT:
           return onDeleteProduct(state, action as DeleteProductAction);
        case ProductsActionType.CREATE_PRODUCT:
            return onCreateProduct(state, action as CreateProductAction);
        case ProductsActionType.UPDATE_PRODUCT:
            return onUpdateProduct(state, action as UpdateProductAction);
        default:
            return state;
    }
};

export default productsReducer;
