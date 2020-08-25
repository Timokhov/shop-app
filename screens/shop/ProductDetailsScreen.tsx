import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { NavigationStackScreenProps, NavigationStackOptions } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { COLORS } from '../../constants/colors';
import { Product } from '../../models/product';
import * as CartActions from '../../store/actions/cart.actions';

interface ProductDetailsScreenProps extends NavigationStackScreenProps {
    product: Product
}

const ProductDetailsScreen = (props: ProductDetailsScreenProps) => {
    const product: Product = props.navigation.getParam('product');
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
        color: '#888',
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

ProductDetailsScreen.navigationOptions = (props: NavigationStackScreenProps) => {
    const product: Product = props.navigation.getParam('product');
    return {
        headerTitle: product.title
    } as NavigationStackOptions;
};

export default ProductDetailsScreen;
