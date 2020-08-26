import React from 'react';
import { View, Button, FlatList, Text, StyleSheet, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CartItemInfo from '../../components/shop/CartItemInfo/CartItemInfo';
import { COLORS } from '../../constants/colors';
import { ExpandedCartItem } from '../../models/cart-item';
import { RootState } from '../../store/store';
import * as CartActions from '../../store/actions/cart.actions';

const CartScreen = () => {

    const totalAmount: number = useSelector(
        (state: RootState) => state.cartState.totalAmount
    );
    const itemsList: ExpandedCartItem[] = useSelector(
        (state: RootState) => {
            return Object.keys(state.cartState.itemsMap).map(id => {
                return { ...state.cartState.itemsMap[id], productId: id }
            });
        }
    );
    const dispatch: Dispatch<Action> = useDispatch();

    const onCartItemRemove = (item: ExpandedCartItem) => {
        dispatch(CartActions.removeFromCart(item.productId));
    };

    const renderCartItem = (itemInfo: ListRenderItemInfo<ExpandedCartItem>): React.ReactElement => {
        return <CartItemInfo item={ itemInfo.item } onRemove={ onCartItemRemove }/>
    };

    return (
        <View style={ styles.screen }>
            <View style={ styles.summary }>
                <Text style={ styles.summaryText }>
                    Total: <Text style={ styles.amount }>${ totalAmount.toFixed(2) }</Text>
                </Text>
                <Button color={ COLORS.primary }
                        title="Order Now"
                        disabled={ itemsList.length === 0 }
                        onPress={ () => {} }
                />
            </View>
           <FlatList data={ itemsList } renderItem={ renderCartItem } keyExtractor={ item => item.productId }/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    amount: {
        color: '#888'
    }
});

export default CartScreen;
