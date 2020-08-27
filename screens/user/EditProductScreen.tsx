import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { Product } from '../../models/product';
import * as ProductsActions from '../../store/actions/products.actions';

interface EditProductScreenProps extends NavigationStackScreenProps {
    product: Product
}

const EditProductScreen = (props: EditProductScreenProps) => {
    const product: Product = props.navigation.getParam('product');

    const [title, setTitle] = useState(product ? product.title : '');
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [price, setPrice] = useState('');

    const dispatch: Dispatch<Action> = useDispatch();

    const submitHandler = useCallback(() => {
        if (product) {
            dispatch(ProductsActions.updateProduct(product.id, title, imageUrl, description));
        } else {
            dispatch(ProductsActions.createProduct(title, imageUrl, description, price));
        }
        props.navigation.goBack();
    }, [product, title, imageUrl, description, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={ styles.form }>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Title</Text>
                    <TextInput style={ styles.input }
                               value={ title }
                               onChangeText={ text => setTitle(text) }
                    />
                </View>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Image Url</Text>
                    <TextInput style={ styles.input }
                               value={ imageUrl }
                               onChangeText={ text => setImageUrl(text) }
                    />
                </View>
                {
                    !product && (
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>Price</Text>
                            <TextInput style={ styles.input }
                                       value={ price }
                                       onChangeText={ text => setPrice(text) }
                            />
                        </View>
                    )
                }
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Description</Text>
                    <TextInput style={ styles.input }
                               value={ description }
                               onChangeText={ text => setDescription(text) }
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        padding: 20
    },
    formControl: {
        width: '100%',
        marginBottom: 30
    },
    label: {
        fontFamily: 'open-sans-bold'
    },
    input: {
        padding: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

EditProductScreen.navigationOptions = (props: NavigationStackScreenProps) => {
    const product: Product = props.navigation.getParam('product');
    const submit = props.navigation.getParam('submit');
    return {
        headerTitle: product ? 'Edit Product' : 'Add Product',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item title='Save'
                          iconName='ios-checkmark'
                          onPress={ submit }
                    />
                </HeaderButtons>
            );
        }
    } as NavigationStackOptions;
};

export default EditProductScreen;
