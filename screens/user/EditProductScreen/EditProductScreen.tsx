import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, Keyboard } from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { useHttpStateObserver } from '../../../hooks/httpStateObserver';
import { Nullable } from '../../../models/nullable';
import { Product } from '../../../models/product';
import InputControl from '../../../components/UI/InputControl/InputControl';
import { User } from '../../../models/user';
import { AdminStackParams } from '../../../navigation/AppNavigator';
import * as FromStoreService from '../../../services/form-store/form-store.service'
import * as ProductsActions from '../../../store/products/products.actions';
import { RootState } from '../../../store/store';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { HttpState } from '../../../models/http-state';

type EditProductScreenStackNavigationProp = StackNavigationProp<AdminStackParams, 'EditProduct'>;
type EditProductScreenRouteProp = RouteProp<AdminStackParams, 'EditProduct'>;
type EditProductScreenProps = {
    navigation: EditProductScreenStackNavigationProp,
    route: EditProductScreenRouteProp
};

const EditProductScreen = (props: EditProductScreenProps) => {
    const product: Nullable<Product> = props.route.params?.product;

    const [isShowLoader, setShowLoader] = useState(false);

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.authState.user
    );
    const createUpdateProductHttpState: HttpState = useSelector(
        (state: RootState) => state.productsState.createUpdateProductHttpState
    );

    const dispatch: Dispatch<Action> = useDispatch();

    useHttpStateObserver(
        createUpdateProductHttpState,
        () => setShowLoader(true),
        () => props.navigation.goBack(),
        () => {
            setShowLoader(false);
            Alert.alert('An error occurred!', createUpdateProductHttpState.error, [{ text: 'Okay' }]);
        }
    );

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
            isValid: !!product,
            submitted: false
        }
    );

    const submitHandler = useCallback(() => {
        Keyboard.dismiss();
        dispatchFormState(FromStoreService.formSubmit());
        if (!createUpdateProductHttpState.requestInProgress) {
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
                            formState.controls['description'].value,
                            user
                        )
                    );
                } else {
                    dispatch(
                        ProductsActions.createProduct(
                            formState.controls['title'].value,
                            formState.controls['imageUrl'].value,
                            formState.controls['description'].value,
                            formState.controls['price'].value,
                            user
                        )
                    );
                }
            }
        }
    }, [product, formState, createUpdateProductHttpState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                        <Item title='Save'
                              iconName='ios-checkmark'
                              onPress={ submitHandler }
                        />
                    </HeaderButtons>
                );
            }
        });
    }, [submitHandler]);

    const onInputValueChange = (inputId: string, newValue: string, isValid: boolean) => {
        dispatchFormState(FromStoreService.formUpdate(inputId, newValue, isValid));
    };

    if (isShowLoader) {
        return <ScreenLoader/>;
    } else {
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={ styles.form }>
                        <InputControl label="Title"
                                      value={ formState.controls['title'].value }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('title', newValue, isValid) }
                                      isValid={ formState.controls['title'].isValid }
                                      error="Please enter valid title."
                                      required
                                      submitted={ formState.submitted }
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      returnKeyType="next"
                        />
                        <InputControl label="Image Url"
                                      value={ formState.controls['imageUrl'].value }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('imageUrl', newValue, isValid) }
                                      isValid={ formState.controls['imageUrl'].isValid }
                                      error="Please enter valid image url."
                                      required
                                      submitted={ formState.submitted }
                                      keyboardType="default"
                                      returnKeyType="next"
                        />
                        {
                            !product && (
                                <InputControl label="Price"
                                              value={ formState.controls['price'].value }
                                              onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('price', newValue, isValid) }
                                              isValid={ formState.controls['price'].isValid }
                                              error="Please enter valid price."
                                              required
                                              submitted={ formState.submitted }
                                              keyboardType="decimal-pad"
                                              returnKeyType="next"
                                              minNumberValue={ 0.1 }
                                />
                            )
                        }
                        <InputControl label="Description"
                                      value={ formState.controls['description'].value }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('description', newValue, isValid) }
                                      isValid={ formState.controls['description'].isValid }
                                      error="Please enter valid image description."
                                      required
                                      submitted={ formState.submitted }
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      multiline
                                      numberOfLines={ 3 }
                                      returnKeyType="next"
                                      minLength={ 5 }

                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    form: {
        padding: 20
    }
});

export const editProductScreenNavigationOptions = (props: EditProductScreenProps) => {
    const product: Nullable<Product> = props.route.params?.product;
    return {
        headerTitle: product ? 'Edit Product' : 'Add Product'
    } as StackNavigationOptions;
};

export default EditProductScreen;
