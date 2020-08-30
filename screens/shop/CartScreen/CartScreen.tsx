import React, { useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet, ListRenderItemInfo, Alert, ActivityIndicator } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CartItemInfo from '../../../components/shop/CartItemInfo/CartItemInfo';
import Card from '../../../components/UI/Card/Card';
import { COLORS } from '../../../constants/colors';
import { ExpandedCartItem } from '../../../models/cart-item';
import { RootState } from '../../../store/store';
import * as CartActions from '../../../store/cart/cart.actions';
import * as OrdersActions from '../../../store/orders/orders.actions';
import { HttpState } from '../../../models/http-state';
import { usePreviousValue } from '../../../hooks/previousValue.hook';

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
    const createOrderHttpState: HttpState = useSelector(
        (state: RootState) => state.ordersState.createOrderHttpState
    );
    const previousCreateOrderHttpState: HttpState | undefined = usePreviousValue<HttpState>(createOrderHttpState);
    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        if (previousCreateOrderHttpState?.requestInProgress
            && !createOrderHttpState.requestInProgress
            && createOrderHttpState.error
        ) {
            Alert.alert('An error occurred!', createOrderHttpState.error, [{ text: 'Okay' }]);
        }
    }, [createOrderHttpState]);

    const onCartItemRemove = (item: ExpandedCartItem) => {
        dispatch(CartActions.removeFromCart(item.productId));
    };

    const onOrderNow = () => {
        dispatch(OrdersActions.createOrder(itemsList, totalAmount));
    };

    const renderCartItem = (itemInfo: ListRenderItemInfo<ExpandedCartItem>): React.ReactElement => {
        return <CartItemInfo item={ itemInfo.item } onRemove={ onCartItemRemove }/>
    };

    return (
        <View style={ styles.screen }>
            <Card style={ styles.summary }>
                <Text style={ styles.summaryText }>
                    Total: <Text style={ styles.amount }>${ Math.round(+totalAmount.toFixed(2) * 100) / 100 }</Text>
                </Text>
                {
                    createOrderHttpState.requestInProgress
                        ? <ActivityIndicator size="small" color={ COLORS.primary }/>
                        : <Button color={ COLORS.primary }
                                  title="Order Now"
                                  disabled={ itemsList.length === 0 }
                                  onPress={ onOrderNow }
                        />
                }
            </Card>
           <FlatList data={ itemsList } renderItem={ renderCartItem } keyExtractor={ item => item.productId }/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    amount: {
        color: '#888'
    }
});

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
} as NavigationStackOptions;

export default CartScreen;
