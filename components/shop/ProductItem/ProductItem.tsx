import React from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { Product } from '../../../models/product';
import { COLORS } from '../../../constants/colors';

interface ProductItemProps {
    product: Product,
    onViewDetails: (product: Product) => void,
    onAddToCart: (product: Product) => void
}

const ProductItem = (props: ProductItemProps) => {
    return (
        <View style={ styles.productItem }>
            <Image style={ styles.image } source={{ uri: props.product.imageUrl }}/>
            <View style={ styles.details }>
                <Text style={ styles.title }>{ props.product.title }</Text>
                <Text style={ styles.price }>${ props.product.price.toFixed(2) }</Text>
            </View>
            <View style={ styles.actionsContainer }>
                <Button title="View Details"
                        color={ COLORS.primary }
                        onPress={ () => props.onViewDetails(props.product) }
                />
                <Button title="Add to Cart"
                        color={ COLORS.primary }
                        onPress={ () => props.onAddToCart(props.product) }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productItem: {
        elevation: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 5
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem;