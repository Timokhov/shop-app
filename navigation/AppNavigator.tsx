import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { DrawerIconProps } from 'react-navigation-drawer/src/types';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';

const defaultNavOptions: NavigationStackOptions = {
    headerStyle: {
        backgroundColor: COLORS.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetails: ProductDetailsScreen,
        Cart: CartScreen
    },
    {
        navigationOptions: {
            drawerIcon: (props: DrawerIconProps) => {
                return <Ionicons name="ios-cart" size={ 23 } color={ props.tintColor }/>
            }
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    },
    {
        navigationOptions: {
            drawerIcon: (props: DrawerIconProps) => {
                return <Ionicons name="ios-list" size={ 23 } color={ props.tintColor }/>
            }
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator
    },
    {
        contentOptions: {
            activeTintColor: COLORS.primary
        }
    }
);

export default createAppContainer(ShopNavigator);
