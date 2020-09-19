import React, { useCallback, useEffect } from 'react';
import { Button, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../../constants/colors';
import { Nullable } from '../../../models/nullable';
import { Product } from '../../../models/product';
import { Action, Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../models/user';
import { ProductsNavigatorParams } from '../../../navigation/AppNavigator';
import * as CartActions from '../../../store/cart/cart.actions';
import * as ProductsActions from '../../../store/products/products.actions';
import { RootState } from '../../../store/store';
import ProductInfo from '../../../components/shop/ProductInfo/ProductInfo';
import ScreenError from '../../../components/UI/ScreenError/ScreenError';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { HttpState } from '../../../models/http-state';
import CartHeaderButton from '../../../components/UI/CartHeaderButton/CartHeaderButton';
import { DrawerNavigationProps } from '../../../models/drawer-navigation-props';

type ProductsOverviewScreenStackNavigationProp = StackNavigationProp<ProductsNavigatorParams, 'ProductsOverview'>;
type ProductsOverviewScreenRouteProp = RouteProp<ProductsNavigatorParams, 'ProductsOverview'>;
type ProductsOverviewScreenProps = {
    navigation: ProductsOverviewScreenStackNavigationProp,
    route: ProductsOverviewScreenRouteProp
};

const ProductsOverviewScreen = (props: ProductsOverviewScreenProps) => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.authState.user
    );
    const productList: Product[] = useSelector(
        (state: RootState) => state.productsState.availableProducts
    );
    const loadProductsHttpState: HttpState = useSelector(
        (state: RootState) => state.productsState.loadProductsHttpState
    );
    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchLoadProducts = useCallback(() => {
        dispatch(ProductsActions.loadProducts(user));
    }, [user, dispatch]);

    useEffect(() => {
        dispatchLoadProducts();
        return props.navigation.addListener('focus', dispatchLoadProducts);
    }, [dispatchLoadProducts]);

    const onRefresh = () => {
        dispatchLoadProducts();
    };

    const onViewDetails = (product: Product) => {
        props.navigation.navigate('ProductDetails', { product: product });
    };

    const onAddToCart = (product: Product) => {
        dispatch(CartActions.addToCart(product));
    };

    const renderProduct = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return (
            <ProductInfo product={ itemInfo.item }
                         onSelect={ onViewDetails }>
                <Button title="View Details"
                        color={ COLORS.primary }
                        onPress={ () => onViewDetails(itemInfo.item) }/>
                <Button title="Add to Cart"
                        color={ COLORS.primary }
                        onPress={ () => onAddToCart(itemInfo.item) }/>
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
    } else if(loadProductsHttpState.error) {
        return <ScreenError message={ loadProductsHttpState.error }
                            onReload={ onRefresh }/>;
    } else if(!productList || productList.length === 0) {
        return <ScreenError message="No products found."
                            onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ productList } 
                      renderItem={ renderProduct } 
                      refreshControl={ refreshControl }/>
        );
    }
};

export const productsOverviewScreenNavigationOptions = (props: DrawerNavigationProps) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Menu'
                          iconName='ios-menu'
                          onPress={ () => props.navigation.toggleDrawer() }/>
                </HeaderButtons>
            );
        },
        headerRight: () => <CartHeaderButton onPress={ () => props.navigation.navigate('Cart') }/>
    } as StackNavigationOptions;
};

export default ProductsOverviewScreen;
