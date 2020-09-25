import { Product } from '../../models/product';
import {
    CreateProductFailAction,
    CreateProductSuccessAction,
    DeleteProductAction, DeleteProductSuccessAction, LoadProductsFailAction, LoadProductsSuccessAction,
    ProductsAction,
    ProductsActionType, UpdateProductFailAction,
    UpdateProductSuccessAction
} from './products.actions';
import { HttpState } from '../../models/http-state';

export interface ProductsState {
    availableProducts: Product[],
    userProducts: Product[],
    loadProductsHttpState: HttpState,
    createUpdateProductHttpState: HttpState
}

const initialState: ProductsState = {
    availableProducts: [],
    userProducts: [],
    loadProductsHttpState: {
        requestInProgress: false,
        error: ''
    },
    createUpdateProductHttpState: {
        requestInProgress: false,
        error: ''
    }
};

const onLoadProductsStart = (state: ProductsState, action: ProductsAction): ProductsState => {
    return {
        ...state,
        loadProductsHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onLoadProductsSuccess = (state: ProductsState, action: LoadProductsSuccessAction): ProductsState => {
    return {
        ...state,
        availableProducts: action.availableProducts,
        userProducts: action.userProducts,
        loadProductsHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onLoadProductsFail = (state: ProductsState, action: LoadProductsFailAction): ProductsState => {
    return {
        ...state,
        availableProducts: [],
        userProducts: [],
        loadProductsHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

const onCreateProductStart = (state: ProductsState, action: ProductsAction): ProductsState => {
    return {
        ...state,
        createUpdateProductHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onCreateProductSuccess = (state: ProductsState, action: CreateProductSuccessAction): ProductsState => {
    return {
        ...state,
        availableProducts: state.availableProducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product),
        createUpdateProductHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onCreateProductFail = (state: ProductsState, action: CreateProductFailAction): ProductsState => {
    return {
        ...state,
        createUpdateProductHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

const onUpdateProductStart = (state: ProductsState, action: ProductsAction): ProductsState => {
    return {
        ...state,
        createUpdateProductHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onUpdateProductSuccess = (state: ProductsState, action: UpdateProductSuccessAction): ProductsState => {
    const userProductIndex: number = state.userProducts.findIndex(product => product.id === action.productId);
    const updatedProduct: Product = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        state.userProducts[userProductIndex].ownerPushToken,
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
        userProducts: updatedUserProducts,
        createUpdateProductHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onUpdateProductFail = (state: ProductsState, action: UpdateProductFailAction): ProductsState => {
    return {
        ...state,
        createUpdateProductHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

const onDeleteProductSuccess = (state: ProductsState, action: DeleteProductSuccessAction): ProductsState => {
    return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.productId)
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
        case ProductsActionType.CREATE_PRODUCT_START:
            return onCreateProductStart(state, action);
        case ProductsActionType.CREATE_PRODUCT_SUCCESS:
            return onCreateProductSuccess(state, action as CreateProductSuccessAction);
        case ProductsActionType.CREATE_PRODUCT_FAIL:
            return onCreateProductFail(state, action as CreateProductFailAction);
        case ProductsActionType.UPDATE_PRODUCT_START:
            return onUpdateProductStart(state, action);
        case ProductsActionType.UPDATE_PRODUCT_SUCCESS:
            return onUpdateProductSuccess(state, action as UpdateProductSuccessAction);
        case ProductsActionType.UPDATE_PRODUCT_FAIL:
            return onUpdateProductFail(state, action as UpdateProductFailAction);
        case ProductsActionType.DELETE_PRODUCT_SUCCESS:
           return onDeleteProductSuccess(state, action as DeleteProductAction);
        default:
            return state;
    }
};

export default productsReducer;
