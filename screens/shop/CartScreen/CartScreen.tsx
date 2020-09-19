import React, { useState } from 'react';
import {
    View,
    Button,
    FlatList,
    Text,
    StyleSheet,
    ListRenderItemInfo,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { Action, Dispatch } from 'redux';
import CartItemInfo from '../../../components/shop/CartItemInfo/CartItemInfo';
import Card from '../../../components/UI/Card/Card';
import { COLORS } from '../../../constants/colors';
import { useHttpStateObserver } from '../../../hooks/httpStateObserver';
import { CartItem } from '../../../models/cart-item';
import { Nullable } from '../../../models/nullable';
import { User } from '../../../models/user';
import { ProductsNavigatorParams } from '../../../navigation/AppNavigator';
import { RootState } from '../../../store/store';
import * as CartActions from '../../../store/cart/cart.actions';
import * as OrdersActions from '../../../store/orders/orders.actions';
import { HttpState } from '../../../models/http-state';

type CartScreenStackNavigationProp = StackNavigationProp<ProductsNavigatorParams, 'Cart'>;
type CartScreenRouteProp = RouteProp<ProductsNavigatorParams, 'Cart'>;
type CartScreenProps = {
    navigation: CartScreenStackNavigationProp,
    route: CartScreenRouteProp
};

const CartScreen = (props: CartScreenProps) => {

    const [isShowLoader, setShowLoader] = useState(false);

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.authState.user
    );
    const totalAmount: number = useSelector(
        (state: RootState) => state.cartState.totalAmount
    );
    const itemsList: CartItem[] = useSelector(
        (state: RootState) => {
            return Object.keys(state.cartState.itemsMap).map(id => {
                return { ...state.cartState.itemsMap[id] };
            });
        }
    );
    const createOrderHttpState: HttpState = useSelector(
        (state: RootState) => state.ordersState.createOrderHttpState
    );

    const dispatch: Dispatch<Action> = useDispatch();

    useHttpStateObserver(
        createOrderHttpState,
        () => setShowLoader(true),
        () => setShowLoader(false),
        () => {
            setShowLoader(false);
            Alert.alert('An error occurred!', createOrderHttpState.error, [{ text: 'Okay' }]);
        }
    );

    const onCartItemSelect = (item: CartItem) => {
        props.navigation.navigate('ProductDetails', { product: item.product });
    };

    const onCartItemRemove = (item: CartItem) => {
        dispatch(CartActions.removeFromCart(item.product.id));
    };

    const onOrderNow = () => {
        dispatch(OrdersActions.createOrder(itemsList, totalAmount, user));
    };

    const renderCartItem = (itemInfo: ListRenderItemInfo<CartItem>): React.ReactElement => {
        return <CartItemInfo item={ itemInfo.item }
                             onSelect={ onCartItemSelect }
                             onRemove={ onCartItemRemove }
        />
    };

    return (
        <View style={ styles.screen }>
            <Card style={ styles.summary }>
                <Text style={ styles.summaryText }>
                    Total: <Text style={ styles.amount }>
                                ${ Math.round(+totalAmount.toFixed(2) * 100) / 100 }
                           </Text>
                </Text>
                {
                    isShowLoader
                        ? <ActivityIndicator size="small" color={ COLORS.primary }/>
                        : <Button color={ COLORS.primary }
                                  title="Order Now"
                                  disabled={ itemsList.length === 0 }
                                  onPress={ onOrderNow }
                        />
                }
            </Card>
           <FlatList data={ itemsList }
                     renderItem={ renderCartItem }
                     keyExtractor={ item => item.product.id }
           />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        paddingBottom: 0
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
        color: COLORS.textHighlight
    }
});

export const cartScreenNavigationOptions = {
    headerTitle: 'Your Cart'
} as StackNavigationOptions;


export default CartScreen;
