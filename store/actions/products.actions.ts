import { Action } from 'redux';

export enum ProductsActionType {
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT'
}

export interface ProductsActions extends Action<ProductsActionType> {

}

export interface DeleteProductAction extends ProductsActions {
    productId: string
}

export interface CreateProductAction extends ProductsActions {
    title: string,
    imageUrl: string,
    description: string,
    price: string,
}

export interface UpdateProductAction extends ProductsActions {
    productId: string
    title: string,
    imageUrl: string,
    description: string
}

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

export const updateProduct = (productId: string, title: string, imageUrl: string, description: string): UpdateProductAction => {
    return {
        type: ProductsActionType.UPDATE_PRODUCT,
        productId: productId,
        title: title,
        imageUrl: imageUrl,
        description: description
    };
};
