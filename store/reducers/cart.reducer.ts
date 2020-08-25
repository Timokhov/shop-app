import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { AddToCartAction, CartAction, CartActionType } from '../actions/cart.actions';

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

const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            return onAddToCart(state, action as AddToCartAction);
        default:
            return state;
    }
};

export default cartReducer;
