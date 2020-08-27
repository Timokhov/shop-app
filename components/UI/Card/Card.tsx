import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
    children: React.ReactNode,
    style?: ViewStyle
}

const Card = (props: CardProps) => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            { props.children }
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        overflow: 'hidden'
    }
});

export default Card;
