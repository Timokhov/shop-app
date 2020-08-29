import React from 'react';
import { Button, FlatList, ListRenderItemInfo, Alert } from 'react-native';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import ProductInfo from '../../../components/shop/ProductInfo/ProductInfo';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { COLORS } from '../../../constants/colors';
import { Product } from '../../../models/product';
import { RootState } from '../../../store/store';
import * as ProductsActions from '../../../store/products/products.actions';

const UserProductsScreen = (props: NavigationDrawerScreenProps) => {

    const userProducts: Product[] = useSelector(
        (state: RootState) => state.productsState.userProducts
    );
    const dispatch: Dispatch<Action> = useDispatch();

    const onEdit = (product: Product) => {
        props.navigation.navigate('EditProduct', { product: product });
    };

    const onDelete = (product: Product) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress: () => dispatch(ProductsActions.deleteProduct(product.id)) }
            ]
        );
    };

    const renderProduct = (itemInfo: ListRenderItemInfo<Product>): React.ReactElement => {
        return <ProductInfo product={ itemInfo.item }
                            onSelect={ onEdit }>
            <Button title="Edit"
                    color={ COLORS.primary }
                    onPress={ () => onEdit(itemInfo.item) }
            />
            <Button title="Delete"
                    color={ COLORS.primary }
                    onPress={ () => onDelete(itemInfo.item) }
            />
        </ProductInfo>
    };

    return (
        <FlatList data={ userProducts } renderItem={ renderProduct }/>
    );
};

UserProductsScreen.navigationOptions = (props: NavigationDrawerScreenProps) => {
    return {
        headerTitle: 'Your Products',
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
                    <Item title='Add'
                          iconName='ios-create'
                          onPress={ () => props.navigation.navigate('EditProduct') }
                    />
                </HeaderButtons>
            );
        }
    } as NavigationStackOptions;
};

export default UserProductsScreen;
