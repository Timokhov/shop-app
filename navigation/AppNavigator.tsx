import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerIconProps } from 'react-navigation-drawer/src/types';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawerNavigationItems from '../components/UI/CustomDrawerNavigationItems/CustomDrawerNavigationItems';
import CartScreen from '../screens/shop/CartScreen/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen/AuthScreen';
import EditProductScreen from '../screens/user/EditProductScreen/EditProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen/UserProductsScreen';

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
        Orders: OrdersScreen,
        ProductDetails: ProductDetailsScreen
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

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: (props: DrawerIconProps) => {
                return <Ionicons name="ios-create" size={ 23 } color={ props.tintColor }/>
            }
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator
    },
    {
        contentOptions: {
            activeTintColor: COLORS.primary
        },
        contentComponent: props => <CustomDrawerNavigationItems {...props}/>
    }
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
