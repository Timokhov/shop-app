import React from 'react';
import { Button, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../constants/colors';
import { Product } from '../../models/product';
import { Dispatch, Action } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/actions/cart.actions';
import { RootState } from '../../store/store';
import ProductInfo from '../../components/shop/ProductInfo/ProductInfo';

const ProductsOverviewScreen = (props: NavigationDrawerScreenProps) => {

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

    return (
       <FlatList data={ productList } renderItem={ renderProduct }/>
    );
};

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
