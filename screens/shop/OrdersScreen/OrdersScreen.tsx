import React, { useCallback, useEffect } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { DrawerActions, RouteProp } from '@react-navigation/native';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import OrderInfo from '../../../components/shop/OrderInfo/OrderInfo';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { COLORS } from '../../../constants/colors';
import { HttpState } from '../../../models/http-state';
import { Nullable } from '../../../models/nullable';
import { Order } from '../../../models/order';
import { User } from '../../../models/user';
import { OrdersNavigatorParams } from '../../../navigation/AppNavigator';
import * as OrdersActions from '../../../store/orders/orders.actions';
import { RootState } from '../../../store/store';
import ScreenError from '../../../components/UI/ScreenError/ScreenError';
import { Product } from '../../../models/product';

type OrdersScreenStackNavigationProp = StackNavigationProp<OrdersNavigatorParams, 'Orders'>;
type OrdersScreenRouteProp = RouteProp<OrdersNavigatorParams, 'Orders'>;
type OrdersScreenProps = {
    navigation: OrdersScreenStackNavigationProp
    route: OrdersScreenRouteProp
};

const OrdersScreen = (props: OrdersScreenProps) => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.authState.user
    );
    const orders: Order[] = useSelector(
        (state: RootState) => state.ordersState.orders
    );
    const loadOrdersHttpState: HttpState = useSelector(
        (state: RootState) => state.ordersState.loadOrdersHttpState
    );
    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchLoadOrders = useCallback(() => {
        dispatch(OrdersActions.loadOrders(user));
    }, [dispatch, user]);

    useEffect(() => {
        dispatchLoadOrders();
        return props.navigation.addListener('focus', dispatchLoadOrders);
    }, [dispatchLoadOrders]);

    const onRefresh = () => {
        dispatchLoadOrders();
    };

    const onSelectProduct = (product: Product) => {
        props.navigation.navigate('ProductDetails', { product: product });
    };

    const renderOrder = (itemInfo: ListRenderItemInfo<Order>): React.ReactElement => {
        return <OrderInfo order={itemInfo.item} onSelectProduct={ onSelectProduct }/>
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ loadOrdersHttpState.requestInProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }/>
    );

    if (loadOrdersHttpState.requestInProgress) {
        return <ScreenLoader/>
    } else if (loadOrdersHttpState.error) {
        return <ScreenError message={ loadOrdersHttpState.error }
                            onReload={ onRefresh }/>;
    } else if (!orders || orders.length === 0) {
        return <ScreenError message="No orders found."
                            onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ orders }
                      renderItem={ renderOrder }
                      refreshControl={ refreshControl }/>
        );
    }
};

export const ordersScreenNavigationOptions  = (props: OrdersScreenProps) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Menu'
                          iconName='ios-menu'
                          onPress={ () => props.navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                </HeaderButtons>
            );
        }
    } as StackNavigationOptions;
};

export default OrdersScreen;
