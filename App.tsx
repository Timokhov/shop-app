import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import * as ExpoNotifications from 'expo-notifications';
import { NotificationBehavior } from 'expo-notifications/src/Notifications.types';

ExpoNotifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true
        } as NotificationBehavior
    }
});

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const App = () => {

    const [isFontLoaded, setFontLoaded] = useState(false);

    if (!isFontLoaded) {
        return <AppLoading startAsync={ fetchFonts } onFinish={() => setFontLoaded(true)}/>
    }

    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
};

export default App;
