import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

const ScreenLoader = () => {
    return (
        <View style={ styles.screenLoader }>
            <ActivityIndicator size="large" color={ COLORS.primary }/>
        </View>
    );
};

const styles = StyleSheet.create({
    screenLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScreenLoader;