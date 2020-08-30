import { Action } from 'redux';
import { Product } from '../../models/product';

export enum ProductsActionType {
    LOAD_PRODUCTS = 'LOAD_PRODUCTS',
    LOAD_PRODUCTS_START = 'LOAD_PRODUCTS_START',
    LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS',
    LOAD_PRODUCTS_FAIL = 'LOAD_PRODUCTS_FAIL',

    DELETE_PRODUCT = 'DELETE_PRODUCT',

    CREATE_PRODUCT = 'CREATE_PRODUCT',
    CREATE_PRODUCT_START = 'CREATE_PRODUCT_START',
    CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL',

    UPDATE_PRODUCT = 'UPDATE_PRODUCT'
}

export interface ProductsAction extends Action<ProductsActionType> {

}

export interface LoadProductsSuccessAction extends ProductsAction {
    products: Product[]
}

export interface LoadProductsFailAction extends ProductsAction {
    error: string
}

export interface DeleteProductAction extends ProductsAction {
    productId: string
}

export interface CreateProductAction extends ProductsAction {
    title: string,
    imageUrl: string,
    description: string,
    price: string,
}

export interface CreateProductSuccessAction extends ProductsAction {
    product: Product
}

export interface UpdateProductAction extends ProductsAction {
    productId: string
    title: string,
    imageUrl: string,
    description: string
}

export const loadProducts = (): ProductsAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS
    };
};

export const loadProductsStart = (): ProductsAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_START
    };
};

export const loadProductsSuccess = (products: Product[]): LoadProductsSuccessAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_SUCCESS,
        products: products
    };
};

export const loadProductsFail = (error: string): LoadProductsFailAction => {
    return {
        type: ProductsActionType.LOAD_PRODUCTS_FAIL,
        error: error
    };
};

export const deleteProduct = (productId: string): DeleteProductAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT,
        productId: productId
    };
};

export const createProduct = (title: string, imageUrl: string, description: string, price: string,): CreateProductAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT,
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
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

export const createProductFail = (): ProductsAction => {
    return {
        type: ProductsActionType.CREATE_PRODUCT_FAIL
    };
};

export const updateProduct = (productId: string, title: string, imageUrl: string, description: string): UpdateProductAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT,
        productId: productId,
        title: title,
        imageUrl: imageUrl,
        description: description
    };
};
