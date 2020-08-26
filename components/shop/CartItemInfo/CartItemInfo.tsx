import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpandedCartItem } from '../../../models/cart-item';

interface CartItemInfoProps {
    item: ExpandedCartItem,
    onRemove: (item: ExpandedCartItem) => void
}

const CartItemInfo = (props: CartItemInfoProps) => {
    return (
        <View style={ styles.cartItemInfo }>
            <View style={ styles.itemData }>
                <Text style={ styles.quantity }>{ props.item.quantity }</Text>
                <Text style={ styles.title }>{ props.item.title }</Text>
            </View>
            <View style={ styles.itemData }>
                <Text style={ styles.amount }>${ props.item.sum.toFixed(2) }</Text>
                <TouchableNativeFeedback onPress={ () => props.onRemove(props.item) }>
                    <View style={ styles.deleteIconContainer }>
                        <Ionicons name="ios-trash" size={ 23 } color="red"/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItemInfo: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888',
        marginHorizontal: 5
    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        marginHorizontal: 5
    },
    amount: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        marginHorizontal: 10,
        color: '#888'
    },
    deleteIconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CartItemInfo;
