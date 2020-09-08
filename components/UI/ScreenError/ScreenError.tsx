import React, { useState } from 'react';
import { Button, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface ScreenErrorProps {
    message: string,
    onReload: () => void
}

const ScreenError = (props: ScreenErrorProps) => {

    const [isRefreshing, setRefreshing] = useState(false);

    const refreshControl: React.ReactElement = (
        <RefreshControl refreshing={ isRefreshing }
                        onRefresh={ props.onReload }
                        colors={ [COLORS.primary] }
        />
    );

    return (
        <ScrollView contentContainerStyle={ styles.error }
                    refreshControl={ refreshControl }>
            <Text>{ props.message }</Text>
            <Button title="Reload" onPress={ props.onReload } color={ COLORS.primary }/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScreenError;
