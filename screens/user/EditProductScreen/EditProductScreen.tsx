import React, { useCallback, useEffect, useReducer } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { Product } from '../../../models/product';
import InputControl from '../../../components/UI/InputControl/InputControl';
import { User } from '../../../models/user';
import * as FromStoreService from '../../../services/form-store/form-store.service'
import * as ProductsActions from '../../../store/products/products.actions';
import { RootState } from '../../../store/store';
import ScreenLoader from '../../../components/UI/ScreenLoader/ScreenLoader';
import { HttpState } from '../../../models/http-state';
import { usePreviousValue } from '../../../hooks/previousValue.hook';

interface EditProductScreenProps extends NavigationStackScreenProps {
    product: Product
}

const EditProductScreen = (props: EditProductScreenProps) => {
    const product: Product = props.navigation.getParam('product');

    const user: User = useSelector(
        (state: RootState) => state.authState.user
    );
    const createUpdateProductHttpState: HttpState = useSelector(
        (state: RootState) => state.productsState.createUpdateProductHttpState
    );
    const previousCreateUpdateProductHttpState: HttpState | undefined = usePreviousValue<HttpState>(createUpdateProductHttpState);
    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        if (previousCreateUpdateProductHttpState?.requestInProgress && !createUpdateProductHttpState.requestInProgress) {
            if (createUpdateProductHttpState.error) {
                Alert.alert('An error occurred!', createUpdateProductHttpState.error, [{ text: 'Okay' }]);
            } else {
                props.navigation.goBack();
            }
        }
    }, [createUpdateProductHttpState]);

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
            isValid: !!product
        }
    );

    const submitHandler = useCallback(() => {
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
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const onInputValueChange = (inputId: string, newValue: string, isValid: boolean) => {
        dispatchFormState(FromStoreService.formUpdate(inputId, newValue, isValid));
    };

    if (createUpdateProductHttpState.requestInProgress) {
        return <ScreenLoader/>;
    } else {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ 100 }>
                <ScrollView>
                    <View style={ styles.form }>
                        <InputControl label="Title"
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      returnKeyType="next"
                                      value={ formState.controls['title'].value }
                                      isValid={ formState.controls['title'].isValid }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('title', newValue, isValid) }
                                      required
                                      error="Please enter valid title."
                        />
                        <InputControl label="Image Url"
                                      keyboardType="default"
                                      returnKeyType="next"
                                      value={ formState.controls['imageUrl'].value }
                                      isValid={ formState.controls['imageUrl'].isValid }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('imageUrl', newValue, isValid)}
                                      required
                                      error="Please enter valid image url."
                        />

                        {
                            !product && (
                                <InputControl label="Price"
                                              keyboardType="decimal-pad"
                                              returnKeyType="next"
                                              value={ formState.controls['price'].value }
                                              isValid={ formState.controls['price'].isValid }
                                              onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('price', newValue, isValid)}
                                              required
                                              minNumberValue={ 0.1 }
                                              error="Please enter valid price."
                                />
                            )
                        }
                        <InputControl label="Description"
                                      keyboardType="default"
                                      autoCapitalize="sentences"
                                      autoCorrect
                                      multiline
                                      numberOfLines={ 3 }
                                      returnKeyType="next"
                                      value={ formState.controls['description'].value }
                                      isValid={ formState.controls['description'].isValid }
                                      onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('description', newValue, isValid)}
                                      required
                                      minLength={ 5 }
                                      error="Please enter valid image description."
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
