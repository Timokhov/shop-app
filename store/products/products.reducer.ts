import { PRODUCTS } from '../../data/dummy-data';
import { Product } from '../../models/product';
import {
    CreateProductSuccessAction,
    DeleteProductAction, LoadProductsFailAction, LoadProductsSuccessAction,
    ProductsAction,
    ProductsActionType,
    UpdateProductAction
} from './products.actions';

export interface ProductsState {
    availableProducts: Product[],
    userProducts: Product[]
    isProductsLoadingInProgress: boolean,
    loadProductsError: string
}

const initialState: ProductsState = {
    availableProducts: [],
    userProducts: [],
    isProductsLoadingInProgress: false,
    loadProductsError: ''
};

const onLoadProductsStart = (state: ProductsState, action: ProductsAction): ProductsState => {
    return {
        ...state,
        isProductsLoadingInProgress: true,
        loadProductsError: ''
    };
};

const onLoadProductsSuccess = (state: ProductsState, action: LoadProductsSuccessAction): ProductsState => {
    return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products,
        isProductsLoadingInProgress: false
    };
};

const onLoadProductsFail = (state: ProductsState, action: LoadProductsFailAction): ProductsState => {
    return {
        ...state,
        availableProducts: [],
        userProducts: [],
        isProductsLoadingInProgress: false,
        loadProductsError: action.error
    };
};

const onDeleteProduct = (state: ProductsState, action: DeleteProductAction): ProductsState => {
    return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.productId)
    };
};

const onCreateProductSuccess = (state: ProductsState, action: CreateProductSuccessAction): ProductsState => {
    return {
        ...state,
        availableProducts: state.availableProducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product)
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

const productsReducer = (state: ProductsState = initialState, action: ProductsAction): ProductsState => {
    switch (action.type) {
        case ProductsActionType.LOAD_PRODUCTS_START:
            return onLoadProductsStart(state, action);
        case ProductsActionType.LOAD_PRODUCTS_SUCCESS:
            return onLoadProductsSuccess(state, action as LoadProductsSuccessAction);
        case ProductsActionType.LOAD_PRODUCTS_FAIL:
            return onLoadProductsFail(state, action as LoadProductsFailAction);
        case ProductsActionType.DELETE_PRODUCT:
           return onDeleteProduct(state, action as DeleteProductAction);
        case ProductsActionType.CREATE_PRODUCT_SUCCESS:
            return onCreateProductSuccess(state, action as CreateProductSuccessAction);
        case ProductsActionType.UPDATE_PRODUCT:
            return onUpdateProduct(state, action as UpdateProductAction);
        default:
            return state;
    }
};

export default productsReducer;
