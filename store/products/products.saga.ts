import { put, takeEvery } from 'redux-saga/effects';
import {
    CreateProductAction,
    DeleteProductAction,
    LoadProductsAction,
    ProductsActionType,
    UpdateProductAction
} from './products.actions';
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

function* loadProductsSaga(action: LoadProductsAction) {
    yield put(ProductsActions.loadProductsStart());
    try {
        const response: FirebaseProductsResponse = yield ProductsService.loadProducts();
        const availableProducts: Product[] = yield Object.keys(response).map(id => {
            const productData: FirebaseProductData = response[id];
            return new Product(
                id,
                productData.ownerId,
                productData.title,
                productData.imageUrl,
                productData.description,
                productData.price
            );
        });
        const userProducts: Product[] = yield availableProducts.filter(product => product.ownerId === action.user.id);
        yield put(ProductsActions.loadProductsSuccess(availableProducts, userProducts));
    } catch (error) {
        yield put(ProductsActions.loadProductsFail(error.message));
    }
}

function* createProductSaga(action: CreateProductAction) {
    yield put(ProductsActions.createProductStart());
    try {
        const response: FirebaseNameResponse = yield ProductsService.createProduct(
            action.title,
            action.imageUrl,
            action.description,
            +action.price,
            action.user
        );
        yield put(ProductsActions.createProductSuccess(
            new Product(
                response.name,
                action.user.id,
                action.title,
                action.imageUrl,
                action.description,
                +action.price
            )
        ));
    } catch (error) {
        yield put(ProductsActions.createProductFail(error.message));
    }
}

function* updateProductSaga(action: UpdateProductAction) {
    yield put(ProductsActions.updateProductStart());
    try {
        yield ProductsService.updateProduct(
            action.productId,
            action.title,
            action.imageUrl,
            action.description,
            action.user
        );
        yield put(ProductsActions.updateProductSuccess(
            action.productId,
            action.title,
            action.imageUrl,
            action.description
        ));
    } catch (error) {
        yield put(ProductsActions.updateProductFail(error.message));
    }
}

function* deleteProductSaga(action: DeleteProductAction) {
    yield put(ProductsActions.deleteProductStart());
    try {
        yield ProductsService.deleteProduct(action.productId, action.user);
        yield put(ProductsActions.deleteProductSuccess(action.productId,));
    } catch (error) {
        yield put(ProductsActions.deleteProductFail());
    }
}
