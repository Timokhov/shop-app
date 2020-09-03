import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { COLORS } from '../constants/colors';
import * as AuthActions from '../store/auth/auth.actions';

const StartupScreen = () => {

    const dispatch: Dispatch<Action> = useDispatch();
    useEffect(() => {
        dispatch(AuthActions.checkAuth());
    }, []);

    return (
        <View style={ styles.screen }>
            <ActivityIndicator size="large" color={ COLORS.primary }/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
