import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { AuthAction, AuthActionType } from '../auth/auth.actions';
import {
    AddToCartAction,
    CartAction,
    CartActionType,
    RemoveFromCartAction
} from './cart.actions';
import { OrdersAction, OrdersActionType } from '../orders/orders.actions';
import { DeleteProductAction, ProductsAction, ProductsActionType } from '../products/products.actions';

export interface CartState {
    itemsMap: {[index: string]: CartItem},
    totalAmount: number
}

const initialState: CartState = {
    itemsMap: {},
    totalAmount: 0
};

const onAddToCart = (state: CartState, action: AddToCartAction): CartState => {
    const product: Product = action.product;
    let cartItem: CartItem;

    if (state.itemsMap[product.id]) {
        cartItem = {
            product: { ...product },
            quantity: state.itemsMap[product.id].quantity + 1,
            sum: state.itemsMap[product.id].sum + product.price,
        };
    } else {
        cartItem = {
            product: { ...product },
            quantity: 1,
            sum: product.price
        };
    }

    const updatedItemMap: {[index: string]: CartItem} = { ...state.itemsMap };
    updatedItemMap[product.id] = cartItem;

    return {
        ...state,
        itemsMap: updatedItemMap,
        totalAmount: state.totalAmount + product.price
    };
};

const onRemoveFromCart = (state: CartState, action: RemoveFromCartAction): CartState => {
    const cartItemToDelete: CartItem = state.itemsMap[action.productId];
    const updatedItemsMap: {[index: string]: CartItem} = { ...state.itemsMap };
    if (cartItemToDelete.quantity > 1) {
        updatedItemsMap[action.productId] = {
            product: { ...cartItemToDelete.product },
            quantity: cartItemToDelete.quantity - 1,
            sum: cartItemToDelete.sum - cartItemToDelete.product.price
        };
    } else {
        delete updatedItemsMap[action.productId];
    }
    return {
        ...state,
        itemsMap: updatedItemsMap,
        totalAmount: state.totalAmount - cartItemToDelete.product.price
    }
};

const onDeleteProduct = (state: CartState, action: DeleteProductAction): CartState => {
    if (state.itemsMap[action.productId]) {
        const itemTotal: number = state.itemsMap[action.productId].sum;
        const updatedItemsMap: {[index: string]: CartItem} = { ...state.itemsMap };
        delete updatedItemsMap[action.productId];
        return {
            ...state,
            itemsMap: updatedItemsMap,
            totalAmount: state.totalAmount - itemTotal
        };
    } else {
        return state;
    }
};

const cartReducer = (state: CartState = initialState, action: CartAction | OrdersAction | ProductsAction | AuthAction): CartState => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            return onAddToCart(state, action as AddToCartAction);
        case CartActionType.REMOVE_FROM_CART:
            return onRemoveFromCart(state, action as RemoveFromCartAction);
        case ProductsActionType.DELETE_PRODUCT:
            return onDeleteProduct(state, action as DeleteProductAction);
        case OrdersActionType.CREATE_ORDER_SUCCESS:
        case AuthActionType.CLEAR_AUTH:
            return initialState;
        default:
            return state;
    }
};

export default cartReducer;
