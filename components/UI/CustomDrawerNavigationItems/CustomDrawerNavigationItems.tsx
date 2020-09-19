import React from 'react'
import { Button, View, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { COLORS } from '../../../constants/colors';
import * as AuthActions from '../../../store/auth/auth.actions';

const CustomDrawerNavigationItems = (props: DrawerContentComponentProps) => {

    const dispatch: Dispatch<Action> = useDispatch();

    const onLogout = () => {
        dispatch(AuthActions.logout());
    };

    return (
        <SafeAreaView style={ styles.itemsContainer }>
            <View>
                <DrawerItemList { ...props }/>
            </View>
            <View style={ styles.logoutButtonContainer }>
                <Button title="Logout" color={ COLORS.danger } onPress={ onLogout }/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    logoutButtonContainer: {
        padding: 20
    }
});

export default CustomDrawerNavigationItems;
