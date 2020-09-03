import React, { useEffect } from 'react';
import { Button, FlatList, ListRenderItemInfo, Alert, RefreshControl } from 'react-native';
import { NavigationEventSubscription } from 'react-navigation';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions } from 'react-navigation-stack';
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
import { RootState } from '../../../store/store';
import Error from '../../../components/UI/Error/Error';
import * as ProductsActions from '../../../store/products/products.actions';

const UserProductsScreen = (props: NavigationDrawerScreenProps) => {

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

    useEffect(() => {
        dispatch(ProductsActions.loadProducts(user));
        const willFocusSubscription: NavigationEventSubscription = props.navigation
            .addListener(
                'willFocus',
                () => dispatch(ProductsActions.loadProducts(user))
            );

        return () => {
            willFocusSubscription.remove();
        }
    }, [dispatch]);

    const onRefresh = () => {
        dispatch(ProductsActions.loadProducts(user));
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
        return <ProductInfo product={ itemInfo.item }
                            onSelect={ onEdit }>
            <Button title="Edit"
                    color={ COLORS.primary }
                    onPress={ () => onEdit(itemInfo.item) }
            />
            <Button title="Delete"
                    color={ COLORS.danger }
                    onPress={ () => onDelete(itemInfo.item) }
            />
        </ProductInfo>
    };

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ loadProductsHttpState.requestInProgress }
                        onRefresh={ onRefresh }
                        colors={ [COLORS.primary] }
        />
    );

    if (loadProductsHttpState.requestInProgress) {
        return <ScreenLoader/>;
    } else if (loadProductsHttpState.error) {
        return <Error message={ loadProductsHttpState.error } onReload={ onRefresh }/>;
    } else if (!userProducts || userProducts.length === 0) {
        return <Error message="No products found." onReload={ onRefresh }/>;
    } else {
        return (
            <FlatList data={ userProducts }
                      renderItem={ renderProduct }
                      refreshControl={ refreshControl }
            />
        );
    }
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
