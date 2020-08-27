import { Action } from 'redux';

export enum ProductsActionType {
    DELETE_PRODUCT = 'DELETE_PRODUCT'
}

export interface ProductsActions extends Action<ProductsActionType> {

}

export interface DeleteProductAction extends ProductsActions {
    productId: string
}

export const deleteProduct = (productId: string): DeleteProductAction => {
    return {
        type: ProductsActionType.DELETE_PRODUCT,
        productId: productId
    };
};
