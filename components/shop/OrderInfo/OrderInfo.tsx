import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { Nullable } from '../../../models/nullable';
import { Order } from '../../../models/order';
import Card from '../../UI/Card/Card';
import CartItemInfo from '../CartItemInfo/CartItemInfo';
import { Product } from '../../../models/product';

interface OrderInfoProps {
    order: Order,
    onSelectProduct?: (product: Product) => void
}

const OrderInfo = (props: OrderInfoProps) => {

    const [showDetails, setShowDetails] = useState(false);

    const onToggleDetails = () => {
        setShowDetails(prevState => !prevState);
    };

    let details: Nullable<React.ReactElement>;
    if (showDetails) {
        details = (
            <View style={ styles.detailsContainer }>
                {
                    props.order.items.map(cartItem => {
                        return <CartItemInfo key={ cartItem.product.id }
                                             item={ cartItem }
                                             onSelect={ () => props.onSelectProduct
                                                 && props.onSelectProduct(cartItem.product)
                                             }
                        />
                    })
                }
            </View>
        );
    }


    return (
        <Card style={ styles.orderInfo }>
            <View style={ styles.summary }>
                <Text style={ styles.totalAmount }>
                    ${ props.order.totalAmount.toFixed(2) }
                </Text>
                <Text style={ styles.date }>
                    { props.order.dateString }
                </Text>
            </View>
            <Button title={ showDetails ? 'Hide Details' : 'Show Details' }
                    color={ COLORS.primary }
                    onPress={ onToggleDetails }/>
            { details }
        </Card>
    );
};

const styles = StyleSheet.create({
    orderInfo: {
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
        color: COLORS.textHighlight
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
    },
    detailsContainer: {
        width: '100%',
        padding: 10
    }
});

export default OrderInfo;
