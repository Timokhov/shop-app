import React from 'react'
import { Button, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { DrawerNavigatorItemsProps } from 'react-navigation-drawer/lib/typescript/src/types';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { COLORS } from '../../../constants/colors';
import * as AuthActions from '../../../store/auth/auth.actions';

const CustomDrawerNavigationItems = (props: DrawerNavigatorItemsProps) => {

    const dispatch: Dispatch<Action> = useDispatch();

    const onLogout = () => {
        dispatch(AuthActions.logout());
    };

    return (
        <SafeAreaView style={ styles.itemsContainer } forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props}/>
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
