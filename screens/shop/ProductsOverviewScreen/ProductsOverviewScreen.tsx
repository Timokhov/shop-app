import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    ListRenderItemInfo,
    ActivityIndicator,
    View,
    StyleSheet,
    RefreshControl
} from 'react-native';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../../constants/colors';
import { Product } from '../../../models/product';
import { Dispatch, Action } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../../store/cart/cart.actions';
import * as ProductsActions from '../../../store/products/products.actions';
import { RootState } from '../../../store/store';
import ProductInfo from '../../../components/shop/ProductInfo/ProductInfo';
import Error from '../../../components/UI/Error/Error';
import { NavigationEventSubscription } from 'react-navigation';

const ProductsOverviewScreen = (props: NavigationDrawerScreenProps) => {

    const [isRefreshing, setRefreshing] = useState(false);

    const productList: Product[] = useSelector(
        (state: RootState) => state.productsState.availableProducts
    );
    const isProductsLoadingInProgress: boolean = useSelector(
        (state: RootState) => state.productsState.isProductsLoadingInProgress
    );
    const loadProductsError: string = useSelector(
        (state: RootState) => state.productsState.loadProductsError
    );
    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        dispatch(ProductsActions.loadProducts());
        const willFocusSubscription: NavigationEventSubscription = props.navigation
            .addListener(
                'willFocus',
                () => dispatch(ProductsActions.loadProducts())
            );

        return () => {
            willFocusSubscription.remove();
        }
    }, [dispatch]);

    const onRefresh = () => {
        dispatch(ProductsActions.loadProducts());
    };

    const onViewDetails = (product: Product) => {
        props.navigation.navigate('ProductDetails', { product: product });
    };

    const onAddToCart = (product: Product) => {
        dispatch(CartActions.addToCart(product));
    };

    const renderProduct = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return <ProductInfo product={ itemInfo.item }
                            onSelect={ onViewDetails }>
            <Button title="View Details"
                    color={ COLORS.primary }
                    onPress={ () => onViewDetails(itemInfo.item) }
            />
            <Button title="Add to Cart"
                    color={ COLORS.primary }
                    onPress={ () => onAddToCart(itemInfo.item) }
            />
        </ProductInfo>
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ isRefreshing }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }
        />
    );

    if (isProductsLoadingInProgress) {
        return (
            <View style={ styles.content }>
                <ActivityIndicator size="large" color={ COLORS.primary }/>
            </View>
        );
    } else if(loadProductsError) {
        return <Error message={ loadProductsError } onReload={ onRefresh }/>;
    } else if(!productList || productList.length === 0) {
        return <Error message="No products found." onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ productList } 
                      renderItem={ renderProduct } 
                      refreshControl={ refreshControl }
            />
        );
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

ProductsOverviewScreen.navigationOptions = (props: NavigationDrawerScreenProps) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Menu'
                          iconName='ios-menu'
                          onPress={ () => props.navigation.toggleDrawer() }
                    />
                </HeaderButtons>
            );
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Cart'
                          iconName='ios-cart'
                          onPress={ () => props.navigation.navigate('Cart') }
                    />
                </HeaderButtons>
            );
        }
    } as NavigationStackOptions;
};

export default ProductsOverviewScreen;
