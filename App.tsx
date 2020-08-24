import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={ store }>
        <AppNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;