import React, { useCallback, useEffect } from 'react';
import { Alert, Button, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { DrawerActions, RouteProp } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import ProductInfo from '../../../components/shop/ProductInfo/ProductInfo';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { COLORS } from '../../../constants/colors';
import { HttpState } from '../../../models/http-state';
import { Nullable } from '../../../models/nullable';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { AdminStackParams } from '../../../navigation/AppNavigator';
import { RootState } from '../../../store/store';
import ScreenError from '../../../components/UI/ScreenError/ScreenError';
import * as ProductsActions from '../../../store/products/products.actions';

type UserProductsScreenStackNavigationProp = StackNavigationProp<AdminStackParams, 'UserProducts'>;
type UserProductsScreenRouteProp = RouteProp<AdminStackParams, 'UserProducts'>;
type UserProductsScreenStackProps = {
    navigation: UserProductsScreenStackNavigationProp,
    route: UserProductsScreenRouteProp
};

const UserProductsScreen = (props: UserProductsScreenStackProps) => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.authState.user
    );
    const userProducts: Product[] = useSelector(
        (state: RootState) => state.productsState.userProducts
    );
    const loadProductsHttpState: HttpState = useSelector(
        (state: RootState) => state.productsState.loadProductsHttpState
    );

    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchLoadProducts = useCallback(() => {
        dispatch(ProductsActions.loadProducts(user));
    }, [dispatch, user]);

    useEffect(() => {
        dispatchLoadProducts();
        return props.navigation.addListener('focus', dispatchLoadProducts);
    }, [dispatchLoadProducts]);

    const onRefresh = () => {
        dispatchLoadProducts();
    };

    const onEdit = (product: Product) => {
        props.navigation.navigate('EditProduct', { product: product });
    };

    const onDelete = (product: Product) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress: () => dispatch(ProductsActions.deleteProduct(product.id, user)) }
            ]
        );
    };

    const renderProduct = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return (
            <ProductInfo product={ itemInfo.item }
                         onSelect={ onEdit }>
                <Button title="Edit"
                        color={ COLORS.primary }
                        onPress={ () => onEdit(itemInfo.item) }/>
                <Button title="Delete"
                        color={ COLORS.danger }
                        onPress={ () => onDelete(itemInfo.item) }/>
            </ProductInfo>
        );
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ loadProductsHttpState.requestInProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }/>
    );

    if (loadProductsHttpState.requestInProgress) {
        return <ScreenLoader/>;
    } else if (loadProductsHttpState.error) {
        return <ScreenError message={ loadProductsHttpState.error }
                            onReload={ onRefresh }/>;
    } else if (!userProducts || userProducts.length === 0) {
        return <ScreenError message="No products found."
                            onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ userProducts }
                      renderItem={ renderProduct }
                      refreshControl={ refreshControl }/>
        );
    }
};

export const userProductsScreenNavigationOptions = (props: UserProductsScreenStackProps) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Menu'
                          iconName='ios-menu'
                          onPress={ () => props.navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                </HeaderButtons>
            );
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Add'
                          iconName='ios-create'
                          onPress={ () => props.navigation.navigate('EditProduct') }/>
                </HeaderButtons>
            );
        }
    } as StackNavigationOptions;
};

export default UserProductsScreen;
