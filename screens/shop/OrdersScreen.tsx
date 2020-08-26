import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import OrderInfo from '../../components/shop/OrderInfo/OrderInfo';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { Order } from '../../models/order';
import { RootState } from '../../store/store';

const OrdersScreen = () => {

    const orders: Order[] = useSelector(
        (state: RootState) => state.ordersState.orders
    );

    const renderOrder = (itemInfo: ListRenderItemInfo<Order>): React.ReactElement => {
        return <OrderInfo order={itemInfo.item}/>
    };

    return (
        <FlatList data={ orders }
                  renderItem={ renderOrder }
        />
    );
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
