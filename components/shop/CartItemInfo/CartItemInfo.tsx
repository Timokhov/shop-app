import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { CartItem } from '../../../models/cart-item';
import { Nullable } from '../../../models/nullable';
import Card from '../../UI/Card/Card';

interface CartItemInfoProps {
    item: CartItem,
    onSelect?: (item: CartItem) => void,
    onRemove?: (item: CartItem) => void
}

const CartItemInfo = (props: CartItemInfoProps) => {

    let removeButton: Nullable<React.ReactElement>;
    if (props.onRemove) {
        removeButton = (
            <TouchableNativeFeedback onPress={ () => props.onRemove && props.onRemove(props.item) }>
                <View style={ styles.deleteIconContainer }>
                    <Ionicons name="ios-trash" size={ 23 } color="red"/>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <Card style={ styles.cartItemInfo }>
            <TouchableNativeFeedback onPress={ () => props.onSelect && props.onSelect(props.item) } useForeground>
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } source={{ uri: props.item.product.imageUrl }}/>
                    <View style={ styles.details }>
                        <Text style={ styles.title }>
                            { props.item.product.title }
                        </Text>
                        <View>
                            <Text style={ styles.detailsText }>Quantity: { props.item.quantity }</Text>
                            <Text style={ styles.detailsText }>Total: ${ props.item.sum.toFixed(2) }</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
            { removeButton }
        </Card>
    );
};

const styles = StyleSheet.create({
    cartItemInfo: {
        flexDirection: 'row',
        margin: 10,
    },
    dataContainer: {
        flexDirection: 'row',
        flex: 6
    },
    image: {
        height: 110,
        width: 110
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 5
    },
    title: {
        fontSize: 15,
        fontFamily: 'open-sans-bold'
    },
    detailsText: {
        fontSize: 14,
        fontFamily: 'open-sans-bold',
        color: COLORS.textHighlight
    },
    deleteIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CartItemInfo;
