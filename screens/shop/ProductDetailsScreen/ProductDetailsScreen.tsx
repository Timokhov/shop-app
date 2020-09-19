import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { Action, Dispatch } from 'redux';
import { COLORS } from '../../../constants/colors';
import { Product } from '../../../models/product';
import { ProductsNavigatorParams } from '../../../navigation/AppNavigator';
import * as CartActions from '../../../store/cart/cart.actions';
import CartHeaderButton from '../../../components/UI/CartHeaderButton/CartHeaderButton';

type ProductDetailsScreenStackNavigationProp = StackNavigationProp<ProductsNavigatorParams, 'ProductDetails'>;
type ProductDetailsScreenRouteProp = RouteProp<ProductsNavigatorParams, 'ProductDetails'>;
type ProductDetailsScreenProps = {
    navigation: ProductDetailsScreenStackNavigationProp,
    route: ProductDetailsScreenRouteProp
};

const ProductDetailsScreen = (props: ProductDetailsScreenProps) => {
    const product: Product = props.route.params.product;
    const dispatch: Dispatch<Action> = useDispatch();

    const onAddToCart = () => {
        dispatch(CartActions.addToCart(product));
    };

    return (
        <ScrollView>
            <Image style={ styles.image } source={{ uri: product.imageUrl }}/>
            <View style={ styles.actionsContainer }>
                <Button color={ COLORS.primary } title="Add To Cart" onPress={ onAddToCart }/>
            </View>
            <Text style={ styles.price }>${ product.price.toFixed(2) }</Text>
            <Text style={ styles.description }>{ product.description }</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actionsContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: COLORS.textHighlight,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        fontFamily: 'open-sans',
        textAlign: 'center',
        paddingHorizontal: 10
    }
});

export const productDetailsScreenNavigationOptions = (props: ProductDetailsScreenProps) => {
    const product: Product = props.route.params.product;
    return {
        headerTitle: product.title,
        headerRight: () => <CartHeaderButton onPress={ () => props.navigation.navigate('Cart') }/>
    } as StackNavigationOptions;
};

export default ProductDetailsScreen;
