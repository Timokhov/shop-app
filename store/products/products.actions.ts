import { Action } from 'redux';
import { Product } from '../../models/product';
import { User } from '../../models/user';

export enum ProductsActionType {
    LOAD_PRODUCTS = 'LOAD_PRODUCTS',
    LOAD_PRODUCTS_START = 'LOAD_PRODUCTS_START',
    LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS',
    LOAD_PRODUCTS_FAIL = 'LOAD_PRODUCTS_FAIL',

    CREATE_PRODUCT = 'CREATE_PRODUCT',
    CREATE_PRODUCT_START = 'CREATE_PRODUCT_START',
    CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL',

    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
    UPDATE_PRODUCT_START = 'UPDATE_PRODUCT_START',
    UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS',
    UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL',

    DELETE_PRODUCT = 'DELETE_PRODUCT',
    DELETE_PRODUCT_START = 'DELETE_PRODUCT_START',
    DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL',
}

export interface ProductsAction extends Action<ProductsActionType> {

}

export interface LoadProductsAction extends ProductsAction {
    user: User
}

export interface LoadProductsSuccessAction extends ProductsAction {
    availableProducts: Product[],
    userProducts: Product[]
}

export interface LoadProductsFailAction extends ProductsAction {
    error: string
}

export interface CreateProductAction extends ProductsAction {
    title: string,
    imageUrl: string,
    description: string,
    price: string,
    user: User
}

export interface CreateProductSuccessAction extends ProductsAction {
    product: Product
}

export interface CreateProductFailAction extends ProductsAction {
    error: string
}

export interface UpdateProductAction extends ProductsAction {
    productId: string
    title: string,
    imageUrl: string,
    description: string,
    user: User
}

export interface UpdateProductSuccessAction extends ProductsAction {
    productId: string,
    title: string,
    imageUrl: string,
    description: string
}

export interface UpdateProductFailAction extends ProductsAction {
    error: string
}

export interface DeleteProductAction extends ProductsAction {
    productId: string,
    user: User
}

export interface DeleteProductSuccessAction extends ProductsAction {
    productId: string
}

export const loadProducts = (user: User): LoadProductsAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS,
        user: user
    };
};

export const loadProductsStart = (): ProductsAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_START
    };
};

export const loadProductsSuccess = (products: Product[], userProducts: Product[]): LoadProductsSuccessAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_SUCCESS,
        availableProducts: products,
        userProducts: userProducts
    };
};

export const loadProductsFail = (error: string): LoadProductsFailAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_FAIL,
        error: error
    };
};

export const createProduct = (title: string, imageUrl: string, description: string, price: string, user: User): CreateProductAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT,
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        user: user
    };
};

export const createProductStart = (): ProductsAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT_START
    };
};

export const createProductSuccess = (product: Product): CreateProductSuccessAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT_SUCCESS,
        product: product
    };
};

export const createProductFail = (error: string): CreateProductFailAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT_FAIL,
        error: error
    };
};

export const updateProduct = (productId: string, title: string, imageUrl: string, description: string, user: User): UpdateProductAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT,
        productId: productId,
        title: title,
        imageUrl: imageUrl,
        description: description,
        user: user
    };
};

export const updateProductStart = (): ProductsAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT_START
    };
};

export const updateProductSuccess = (productId: string, title: string, imageUrl: string, description: string): UpdateProductSuccessAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT_SUCCESS,
        productId: productId,
        title: title,
        imageUrl: imageUrl,
        description: description
    };
};

export const updateProductFail = (error: string): UpdateProductFailAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT_FAIL,
        error: error
    };
};

export const deleteProduct = (productId: string, user: User): DeleteProductAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT,
        productId: productId,
        user: user
    };
};

export const deleteProductStart = (): ProductsAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT_START
    };
};

export const deleteProductSuccess = (productId: string): DeleteProductSuccessAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT_SUCCESS,
        productId: productId
    };
};

export const deleteProductFail = (): ProductsAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT_FAIL
    };
};
