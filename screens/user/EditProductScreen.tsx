import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Product } from '../../models/product';

interface EditProductScreenProps extends NavigationStackScreenProps {
    product: Product
}

const EditProductScreen = (props: EditProductScreenProps) => {
    const product: Product = props.navigation.getParam('product');

    return (
        <View>
            <Text>
                The edit product screen
            </Text>
            <Text>
                { product && product.title }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default EditProductScreen;
