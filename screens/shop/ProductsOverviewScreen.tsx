import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/src/types';
import { Product } from '../../models/product';
import { Dispatch, Action } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/actions/cart.actions';
import { RootState } from '../../store/store';
import ProductItem from '../../components/shop/ProductItem/ProductItem';

const ProductsOverviewScreen = (props: NavigationStackScreenProps) => {

    const productList: Product[] = useSelector(
        (state: RootState) => state.productsState.availableProducts
    );
    const dispatch: Dispatch<Action> = useDispatch();

    const onViewDetails = (product: Product) => {
        props.navigation.navigate('ProductDetails', { product: product });
    };

    const onAddToCart = (product: Product) => {
        dispatch(CartActions.addToCart(product));
    };

    const renderProductItem = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return <ProductItem product={ itemInfo.item }
                            onViewDetails={ onViewDetails }
                            onAddToCart={ onAddToCart }
        />
    };

    return (
       <FlatList data={ productList }
                 renderItem={ renderProductItem }
       />
    );
};

const styles = StyleSheet.create({

});

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
} as NavigationStackOptions;

export default ProductsOverviewScreen;
