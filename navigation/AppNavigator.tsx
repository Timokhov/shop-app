import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationOptions } from '@react-navigation/drawer/lib/typescript/src/types';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import CustomDrawerNavigationItems from '../components/UI/CustomDrawerNavigationItems/CustomDrawerNavigationItems';
import { COLORS } from '../constants/colors';
import { Product } from '../models/product';
import CartScreen, { cartScreenNavigationOptions } from '../screens/shop/CartScreen/CartScreen';
import OrdersScreen, { ordersScreenNavigationOptions } from '../screens/shop/OrdersScreen/OrdersScreen';
import ProductDetailsScreen, { productDetailsScreenNavigationOptions } from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import ProductsOverviewScreen, { productsOverviewScreenNavigationOptions } from '../screens/shop/ProductsOverviewScreen/ProductsOverviewScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen, { authScreenNavigationOptions } from '../screens/user/AuthScreen/AuthScreen';
import EditProductScreen, { editProductScreenNavigationOptions } from '../screens/user/EditProductScreen/EditProductScreen';
import UserProductsScreen, { userProductsScreenNavigationOptions } from '../screens/user/UserProductsScreen/UserProductsScreen';
import { RootState } from '../store/store';


const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: COLORS.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'
};

export type ProductsNavigatorParams = {
    ProductsOverview: undefined,
    ProductDetails: { product: Product },
    Cart: undefined
}
const ProductsStackNavigator = createStackNavigator<ProductsNavigatorParams>();
const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <ProductsStackNavigator.Screen
                name="ProductsOverview"
                component={ ProductsOverviewScreen }
                options={ productsOverviewScreenNavigationOptions }
            />
            <ProductsStackNavigator.Screen
                name="ProductDetails"
                component={ ProductDetailsScreen }
                options={ productDetailsScreenNavigationOptions }
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={ CartScreen }
                options={ cartScreenNavigationOptions }
            />
        </ProductsStackNavigator.Navigator>
    );
};

export type OrdersNavigatorParams = {
    Orders: undefined,
    ProductDetails: { product: Product }
}
const OrdersStackNavigator = createStackNavigator<OrdersNavigatorParams>();
const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <OrdersStackNavigator.Screen
                name="Orders"
                component={ OrdersScreen }
                options={ ordersScreenNavigationOptions }
            />
            <OrdersStackNavigator.Screen
                name="ProductDetails"
                component={ ProductDetailsScreen }
                options={ productDetailsScreenNavigationOptions }
            />
        </OrdersStackNavigator.Navigator>
    );
};

export type AdminStackParams = {
    UserProducts: undefined,
    EditProduct: { product?: Product }
}
const AdminStackNavigator = createStackNavigator<AdminStackParams>();
const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <AdminStackNavigator.Screen
                name="UserProducts"
                component={ UserProductsScreen }
                options={ userProductsScreenNavigationOptions }
            />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={ EditProductScreen }
                options={ editProductScreenNavigationOptions }
            />
        </AdminStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();
const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <AuthStackNavigator.Screen
                name="Auth"
                component={ AuthScreen }
                options={ authScreenNavigationOptions }
            />
        </AuthStackNavigator.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();
const ShopNavigator = () => {
    return (
        <ShopDrawerNavigator.Navigator drawerContent={ props => <CustomDrawerNavigationItems {...props}/> }
                                       drawerContentOptions={{
                                           activeTintColor: COLORS.primary,
                                           labelStyle: { fontFamily: 'open-sans-bold' }
                                       }}>
            <ShopDrawerNavigator.Screen name="Products"
                                        component={ ProductsNavigator }
                                        options={
                                            {
                                                drawerIcon: props => <Ionicons name="ios-cart"
                                                                               size={ 23 }
                                                                               color={ props.color }/>
                                            } as DrawerNavigationOptions
                                        }

            />
            <ShopDrawerNavigator.Screen name="Orders"
                                        component={ OrdersNavigator }
                                        options={
                                            {
                                                drawerIcon: props => <Ionicons name="ios-list"
                                                                               size={ 23 }
                                                                               color={ props.color }/>
                                            } as DrawerNavigationOptions
                                        }
            />
            <ShopDrawerNavigator.Screen name="Admin"
                                        component={ AdminNavigator }
                                        options={
                                            {
                                                drawerIcon: props => <Ionicons name="ios-create"
                                                                               size={ 23 }
                                                                               color={ props.color }/>
                                            } as DrawerNavigationOptions
                                        }
            />
        </ShopDrawerNavigator.Navigator>
    );
};

const AppNavigator = () => {

    const isAuthenticated: boolean = useSelector(
        (state: RootState) => !!state.authState.user
    );
    const authChecked: boolean = useSelector(
        (state: RootState) => state.authState.authChecked
    );

    return (
        <NavigationContainer>
            { isAuthenticated && <ShopNavigator/> }
            { !isAuthenticated && authChecked && <AuthNavigator/> }
            { !isAuthenticated && !authChecked && <StartupScreen/> }
        </NavigationContainer>
    );
};

export default AppNavigator;
