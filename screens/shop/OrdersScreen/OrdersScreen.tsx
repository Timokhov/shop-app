import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { NavigationEventSubscription } from 'react-navigation';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import OrderInfo from '../../../components/shop/OrderInfo/OrderInfo';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { COLORS } from '../../../constants/colors';
import { HttpState } from '../../../models/http-state';
import { Order } from '../../../models/order';
import * as OrdersActions from '../../../store/orders/orders.actions';
import { RootState } from '../../../store/store';
import Error from '../../../components/UI/Error/Error';

const OrdersScreen = (props: NavigationDrawerScreenProps) => {
    const orders: Order[] = useSelector(
        (state: RootState) => state.ordersState.orders
    );
    const loadOrdersHttpState: HttpState = useSelector(
        (state: RootState) => state.ordersState.loadOrdersHttpState
    );
    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        dispatch(OrdersActions.loadOrders());
        const willFocusSubscription: NavigationEventSubscription = props.navigation
            .addListener(
                'willFocus',
                () => dispatch(OrdersActions.loadOrders())
            );

        return () => {
            willFocusSubscription.remove();
        }
    }, [dispatch]);

    const onRefresh = () => {
        dispatch(OrdersActions.loadOrders());
    };

    const renderOrder = (itemInfo: ListRenderItemInfo<Order>): React.ReactElement => {
        return <OrderInfo order={itemInfo.item}/>
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ loadOrdersHttpState.requestInProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }
        />
    );

    if (loadOrdersHttpState.requestInProgress) {
        return <ScreenLoader/>
    } else if (loadOrdersHttpState.error) {
        return <Error message={ loadOrdersHttpState.error } onReload={ onRefresh }/>;
    } else if (!orders || orders.length === 0) {
        return <Error message="No orders found."  onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ orders }
                      renderItem={ renderOrder }
                      refreshControl={ refreshControl }
            />
        );
    }
};

OrdersScreen.navigationOptions = (props: NavigationDrawerScreenProps) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Menu'
                          iconName='ios-menu'
                          onPress={ () => props.navigation.toggleDrawer() }
                    />
                </HeaderButtons>
            );
        }
    } as NavigationStackOptions;
};

export default OrdersScreen
