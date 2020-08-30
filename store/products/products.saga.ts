import { put, takeEvery } from 'redux-saga/effects';
import { CreateProductAction, DeleteProductAction, ProductsActionType, UpdateProductAction } from './products.actions';
import * as ProductsActions from './products.actions';
import * as ProductsService from '../../services/products/products.service';
import { Product } from '../../models/product';
import { FirebaseNameResponse, FirebaseProductData, FirebaseProductsResponse } from '../../models/firebase';

export function* watchProductsSaga() {
    yield takeEvery(ProductsActionType.LOAD_PRODUCTS, loadProductsSaga);
    yield takeEvery(ProductsActionType.CREATE_PRODUCT, createProductSaga);
    yield takeEvery(ProductsActionType.UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(ProductsActionType.DELETE_PRODUCT, deleteProductSaga);
}

function* loadProductsSaga() {
    yield put(ProductsActions.loadProductsStart());
    try {
        const response: FirebaseProductsResponse = yield ProductsService.loadProducts();
        const products: Product[] = yield Object.keys(response).map(id => {
            const productData: FirebaseProductData = response[id];
            return new Product(
                id,
                productData.ownerId,
                productData.title,
                productData.imageUrl,
                productData.description,
                +productData.price
            );
        });
        yield put(ProductsActions.loadProductsSuccess(products));
    } catch (error) {
        yield put(ProductsActions.loadProductsFail('Something went wrong!'));
    }
}

function* createProductSaga(action: CreateProductAction) {
    yield put(ProductsActions.createProductStart());
    try {
        const response: FirebaseNameResponse = yield ProductsService.createProduct(
            'u1',
            action.title,
            action.imageUrl,
            action.description,
            action.price
        );
        yield put(ProductsActions.createProductSuccess(
            new Product(
                response.name,
                'u1',
                action.title,
                action.imageUrl,
                action.description,
                +action.price
            )
        ));
    } catch (error) {
        yield put(ProductsActions.createProductFail('Something went wrong!'));
    }
}

function* updateProductSaga(action: UpdateProductAction) {
    yield put(ProductsActions.updateProductStart());
    try {
        yield ProductsService.updateProduct(
            action.productId,
            'u1',
            action.title,
            action.imageUrl,
            action.description
        );
        yield put(ProductsActions.updateProductSuccess(
            action.productId,
            action.title,
            action.imageUrl,
            action.description
        ));
    } catch (error) {
        yield put(ProductsActions.updateProductFail('Something went wrong!'));
    }
}

function* deleteProductSaga(action: DeleteProductAction) {
    yield put(ProductsActions.deleteProductStart());
    try {
        yield ProductsService.deleteProduct(action.productId);
        yield put(ProductsActions.deleteProductSuccess(action.productId,));
    } catch (error) {
        yield put(ProductsActions.deleteProductFail());
    }
}