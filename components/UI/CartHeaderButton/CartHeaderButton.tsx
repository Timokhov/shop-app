import React from 'react';
import CustomHeaderButton from '../CustomHeaderButton/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CartItem } from '../../../models/cart-item';
import { COLORS } from '../../../constants/colors';

interface CartHeaderButtonProps {
    onPress: () => void
}

const CartHeaderButton = (props: CartHeaderButtonProps) => {

    const cartItemsCount: number = useSelector(
        (state: RootState) => {
            const itemsMap: {[index: string]: CartItem} = state.cartState.itemsMap;
            return Object.keys(itemsMap)
                .reduce((accumulator: number, currentKey: string) => {
                        return accumulator + itemsMap[currentKey].quantity
                    }, 0);
        }
    );

    return (
        <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
            <Item title='Cart'
                  iconName='ios-cart'
                  onPress={ props.onPress }/>
            {
                cartItemsCount > 0 && (
                    <View style={ styles.countBadge } pointerEvents="none">
                        <Text style={ styles.count }>{ cartItemsCount }</Text>
                    </View>
                )
            }
        </HeaderButtons>
    );
}

const styles = StyleSheet.create({
    countBadge: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.danger
    },
    count: {
        fontFamily: 'open-sans-bold',
        fontSize: 10,
        textAlign: 'center',
        color: 'white'
    }
})

export default CartHeaderButton;