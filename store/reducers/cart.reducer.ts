import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import {
    AddToCartAction,
    CartAction,
    CartActionType,
    RemoveFromCartAction
} from '../actions/cart.actions';
import { OrdersAction, OrdersActionType } from '../actions/orders.actions';
import { DeleteProductAction, ProductsActions, ProductsActionType } from '../actions/products.actions';

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
        cartItem = new CartItem(
            state.itemsMap[product.id].quantity + 1,
            state.itemsMap[product.id].price,
            product.title,
            state.itemsMap[product.id].sum + product.price,
        );
    } else {
        cartItem = new CartItem(
            1,
            product.price,
            product.title,
            product.price
        );
    }

    return {
        ...state,
        itemsMap: { ...state.itemsMap, [product.id]: cartItem },
        totalAmount: state.totalAmount + product.price
    };
};

const onRemoveFromCart = (state: CartState, action: RemoveFromCartAction): CartState => {
    const cartItemToDelete: CartItem = state.itemsMap[action.productId];
    const updatedItemsMap: {[index: string]: CartItem} = { ...state.itemsMap };
    if (cartItemToDelete.quantity > 1) {
        updatedItemsMap[action.productId] = new CartItem(
            cartItemToDelete.quantity - 1,
            cartItemToDelete.price,
            cartItemToDelete.title,
            cartItemToDelete.sum - cartItemToDelete.price
        );
    } else {
        delete updatedItemsMap[action.productId];
    }
    return {
        ...state,
        itemsMap: updatedItemsMap,
        totalAmount: state.totalAmount - cartItemToDelete.price
    }
};

const onAddOrder = (): CartState => {
    return initialState;
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

const cartReducer = (state: CartState = initialState, action: CartAction | OrdersAction | ProductsActions): CartState => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            return onAddToCart(state, action as AddToCartAction);
        case CartActionType.REMOVE_FROM_CART:
            return onRemoveFromCart(state, action as RemoveFromCartAction);
        case OrdersActionType.ADD_ORDER:
            return onAddOrder();
        case ProductsActionType.DELETE_PRODUCT:
            return onDeleteProduct(state, action as DeleteProductAction);
        default:
            return state;
    }
};

export default cartReducer;
