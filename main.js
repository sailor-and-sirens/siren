import Expo from 'expo';
import React from 'react';
import { AppRegistry, View } from 'react-native';
import { createStore } from 'redux';
import App from './components/App';

// Import the reducer and create a store
import { reducer } from './reducers/index';
const store = createStore(reducer);

const AppWithStore = () => <App store={store} />;

Expo.registerRootComponent(AppWithStore);
