import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { Product } from '../../../models/product';
import * as FromStoreService from '../../../services/form-store/form-store.service'

import * as ProductsActions from '../../../store/actions/products.actions';

interface EditProductScreenProps extends NavigationStackScreenProps {
    product: Product
}

const EditProductScreen = (props: EditProductScreenProps) => {
    const product: Product = props.navigation.getParam('product');

    const dispatch: Dispatch<Action> = useDispatch();

    const [formState, dispatchFormState] = useReducer(
        FromStoreService.formReducer,
        {
            controls: {
                title: {
                    value: product ? product.title : '',
                    isValid: !!product
                },
                imageUrl: {
                    value: product ? product.imageUrl : '',
                    isValid: !!product
                },
                description: {
                    value: product ? product.description : '',
                    isValid: !!product
                },
                price: {
                    value: '',
                    isValid: !!product
                }
            },
            isValid: false
        }
    );

    const submitHandler = useCallback(() => {
        if (!formState.isValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors is the form.',
                [{ text: 'Okay' }]
            );
        } else {
            if (product) {
                dispatch(
                    ProductsActions.updateProduct(
                        product.id,
                        formState.controls['title'].value,
                        formState.controls['imageUrl'].value,
                        formState.controls['description'].value
                    )
                );
            } else {
                dispatch(
                    ProductsActions.updateProduct(
                        formState.controls['title'].value,
                        formState.controls['imageUrl'].value,
                        formState.controls['description'].value,
                        formState.controls['price'].value
                    )
                );
            }
            props.navigation.goBack();
        }
    }, [product, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangedHandler = (inputId: string, text: string) => {
        let isValid: boolean = false;
        if (text && text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState(FromStoreService.formUpdate(inputId, text, isValid));
    };

    return (
        <ScrollView>
            <View style={ styles.form }>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Title</Text>
                    <TextInput style={ styles.input }
                               value={ formState.controls['title'].value }
                               onChangeText={ text => textChangedHandler('title', text)  }
                    />
                    { !formState.controls['title'].isValid && <Text>Please enter a valid title!</Text> }
                </View>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Image Url</Text>
                    <TextInput style={ styles.input }
                               value={ formState.controls['imageUrl'].value }
                               onChangeText={ text => textChangedHandler('imageUrl', text) }
                    />
                </View>
                {
                    !product && (
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>Price</Text>
                            <TextInput style={ styles.input }
                                       value={ formState.controls['description'].value }
                                       keyboardType='decimal-pad'
                                       onChangeText={ text => textChangedHandler('description', text) }
                            />
                        </View>
                    )
                }
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>Description</Text>
                    <TextInput style={ styles.input }
                               value={ formState.controls['price'].value }
                               onChangeText={ text => textChangedHandler('price', text) }
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
