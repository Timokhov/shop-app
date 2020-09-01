import React, { useEffect, useReducer, useState } from 'react';
import { View, ScrollView, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import Card from '../../../components/UI/Card/Card';
import InputControl from '../../../components/UI/InputControl/InputControl';
import { COLORS } from '../../../constants/colors';
import { usePreviousValue } from '../../../hooks/previousValue.hook';
import { HttpState } from '../../../models/http-state';
import * as FromStoreService from '../../../services/form-store/form-store.service'
import * as AuthActions from'../../../store/auth/auth.actions';
import { RootState } from '../../../store/store';

enum AuthMode{
    LOGIN,
    SIGN_UP
}

const AuthScreen = (props: NavigationStackScreenProps) => {

    const[authMode, setAuthMode] = useState(AuthMode.LOGIN);

    const authHttpState: HttpState = useSelector(
        (state: RootState) => state.authState.authHttpState
    );
    const isAuthenticated: boolean = useSelector(
        (state: RootState) => state.authState.user.id !== null
    );

    const previousAuthHttpState: HttpState | undefined = usePreviousValue<HttpState>(authHttpState);
    useEffect(() => {
        if (previousAuthHttpState?.requestInProgress && !authHttpState.requestInProgress) {
            if (authHttpState.error) {
                Alert.alert('An error occurred!', authHttpState.error, [{ text: 'Okay' }]);
            }
        }
    }, [authHttpState]);

    useEffect(() => {
        if (isAuthenticated) {
            props.navigation.navigate('Shop');
        }
    }, [isAuthenticated]);

    const [formState, dispatchFormState] = useReducer(
        FromStoreService.formReducer,
        {
            controls: {
                email: {
                    value: '',
                    isValid: false
                },
                password: {
                    value: '',
                    isValid: false
                }
            },
            isValid: false
        }
    );
    const dispatch: Dispatch<Action> = useDispatch();

    const onInputValueChange = (inputId: string, newValue: string, isValid: boolean) => {
        dispatchFormState(FromStoreService.formUpdate(inputId, newValue, isValid));
    };

    const onAuth = () => {
        if (formState.isValid) {
            if (authMode === AuthMode.LOGIN) {
                dispatch(AuthActions.login(formState.controls['email'].value, formState.controls['password'].value));
            } else {
                dispatch(AuthActions.signUp(formState.controls['email'].value, formState.controls['password'].value));
            }
        } else {
            Alert.alert('Form is not valid!', 'Pleas check input values.', [{ text: 'Okay' }]);
        }
    };

    const onAuthModeChange = () => {
        setAuthMode((prevState => prevState === AuthMode.LOGIN ? AuthMode.SIGN_UP : AuthMode.LOGIN));
    };

    return (
        <View style={ styles.screen }>
            <Card style={ styles.auth }>
                <ScrollView>
                    <InputControl label="Email"
                                  value={ formState.controls['email'].value }
                                  onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('email', newValue, isValid) }
                                  isValid={ formState.controls['email'].isValid }
                                  error="Please enter valid email."
                                  keyboardType="email-address"
                                  required
                                  email
                                  autoCapitalize="none"
                    />
                    <InputControl label="Password"
                                  value={ formState.controls['password'].value }
                                  onValueChange={ (newValue: string, isValid: boolean) => onInputValueChange('password', newValue, isValid) }
                                  isValid={ formState.controls['password'].isValid }
                                  error="Please enter valid password."
                                  keyboardType="default"
                                  secureTextEntry
                                  required
                                  minLength={ 6 }
                                  autoCapitalize="none"
                    />
                    <View>
                        {
                            authHttpState.requestInProgress
                                ? <ActivityIndicator size="small" color={ COLORS.primary }/>
                                : (
                                    <>
                                        <View style={ styles.buttonContainer }>
                                            <Button title={ authMode === AuthMode.LOGIN ? "Login" : 'Sign Up' } onPress={ onAuth } color={ COLORS.primary }/>
                                        </View>
                                        <View style={ styles.buttonContainer }>
                                            <Button title={ `Switch To ${authMode === AuthMode.LOGIN ? "Sign Up" : 'Login'}` } onPress={ onAuthModeChange } color="#6e93d6"/>
                                        </View>
                                    </>
                                )
                        }
                    </View>
                </ScrollView>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    auth: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginBottom: 10
    }
});

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
} as NavigationStackOptions;

export default AuthScreen;