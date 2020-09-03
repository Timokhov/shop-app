import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { ExpandedCartItem } from '../../../models/cart-item';
import { Nullable } from '../../../models/nullable';

interface CartItemInfoProps {
    item: ExpandedCartItem,
    onRemove?: (item: ExpandedCartItem) => void
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
        <View style={ styles.cartItemInfo }>
            <View style={ styles.itemData }>
                <Text style={ styles.quantity }>{ props.item.quantity }</Text>
                <Text style={ styles.title }>
                    {
                        props.item.title.length > 22
                            ? props.item.title.substring(0, 19) + '...'
                            : props.item.title
                    }
                </Text>
            </View>
            <View style={ styles.itemData }>
                <Text style={ styles.amount }>${ props.item.sum.toFixed(2) }</Text>
                { removeButton }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItemInfo: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: COLORS.textHighlight,
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
        color: COLORS.textHighlight
    },
    deleteIconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CartItemInfo;
