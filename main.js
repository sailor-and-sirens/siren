import Expo from 'expo';
import React from 'react';
import { AppRegistry, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';

// Import the reducer and create a store
import { reducer } from './reducers/index';
const store = createStore(reducer);

// pass store into Provider so we can change how we're connecting to the store
// no longer have to use componentWillMount/Unmount w/ setState
const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

Expo.registerRootComponent(AppWithStore);
