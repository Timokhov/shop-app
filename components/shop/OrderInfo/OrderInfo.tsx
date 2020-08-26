import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { Order } from '../../../models/order';
import CartItemInfo from '../CartItemInfo/CartItemInfo';

interface OrderInfoProps {
    order: Order
}

const OrderInfo = (props: OrderInfoProps) => {

    const [showDetails, setShowDetails] = useState(false);

    const onToggleDetails = () => {
        setShowDetails(prevState => !prevState);
    };

    let details: React.ReactElement | undefined;
    if (showDetails) {
        details = (
            <View>
                {
                    props.order.items.map(cartItem => {
                        return <CartItemInfo key={ cartItem.productId } item={ cartItem }/>
                    })
                }
            </View>
        );
    }


    return (
        <View style={ styles.orderInfo }>
            <View style={ styles.summary }>
                <Text style={ styles.totalAmount }>${ props.order.totalAmount }</Text>
                <Text style={ styles.date }>{ props.order.dateString }</Text>
            </View>
            <Button title={ showDetails ? 'Hide Details' : 'Show Details' }
                    color={ COLORS.primary }
                    onPress={ onToggleDetails }
            />
            { details }
        </View>
    );
};

const styles = StyleSheet.create({
    orderInfo: {
        elevation: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        color: '#888'
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
    }
});

export default OrderInfo;
