import React from 'react';
import { View, StyleSheet, Image, Text, TouchableNativeFeedback } from 'react-native';
import { Product } from '../../../models/product';
import Card from '../../UI/Card/Card';

interface ProductItemProps {
    product: Product,
    onSelect: (product: Product) => void,
    children: React.ReactNode,
}

const ProductInfo = (props: ProductItemProps) => {
    return (
        <Card style={ styles.productInfo }>
            <TouchableNativeFeedback onPress={ () => props.onSelect(props.product) } useForeground>
                <View>
                    <Image style={ styles.image } source={{ uri: props.product.imageUrl }}/>
                    <View style={ styles.details }>
                        <Text style={ styles.title }>{ props.product.title }</Text>
                        <Text style={ styles.price }>${ props.product.price.toFixed(2) }</Text>
                    </View>
                    <View style={ styles.actionsContainer }>
                        { props.children }
                    </View>
                </View>
            </TouchableNativeFeedback>
        </Card>
    );
};

const styles = StyleSheet.create({
    productInfo: {
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
        marginVertical: 5,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductInfo;
