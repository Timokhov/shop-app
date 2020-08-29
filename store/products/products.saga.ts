import { put, takeEvery } from 'redux-saga/effects';
import { CreateProductAction, ProductsActionType } from './products.actions';
import * as ProductsActions from './products.actions';
import * as ProductsService from '../../services/products/products.service';
import { Product } from '../../models/product';
import { FirebasePostResponse, FirebaseProductData, FirebaseProductsResponse } from '../../models/firebase';

export function* watchProductsSaga() {
    yield takeEvery(ProductsActionType.LOAD_PRODUCTS, loadProductsSaga);
    yield takeEvery(ProductsActionType.CREATE_PRODUCT, createProductSaga);
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
        yield put(ProductsActions.loadProductsFail());
    }
}

function* createProductSaga(action: CreateProductAction) {
    yield put(ProductsActions.createProductStart());
    try {
        const response: FirebasePostResponse = yield ProductsService.createProduct(
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
        yield put(ProductsActions.createProductFail());
    }
}