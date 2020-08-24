import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Product } from '../../models/product';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ProductItem from '../../components/shop/ProductItem/ProductItem';

const ProductsOverviewScreen = () => {

    const productList: Product[] = useSelector(
        (state: RootState) => state.productsState.availableProducts
    );

    const viewDetails = (product: Product) => {
        console.log(JSON.stringify(product));
    }

    const addToCart = (product: Product) => {
        console.log(JSON.stringify(product));
    }

    const renderProductItem = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return <ProductItem product={ itemInfo.item }
                            onViewDetails={ viewDetails }
                            onAddToCart={ addToCart }
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
} as NavigationStackOptions

export default ProductsOverviewScreen;