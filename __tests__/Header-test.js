import React from 'react';
import Header from '../components/Header.js';
import header from '../reducers/Header.js';
import { headerActions } from '../actions/Header.js';
import { initialState } from '../reducers/Header.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

test('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Header />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//TESTING REDUCERS
test('reducer returns default state and renders correctly', () => {
  expect(header(initialState, {type: '_NULL'})).toMatchSnapshot();
  //Alternative to snapshots
    // expect(header(initialState, {type: '_NULL'})).toEqual({
    //   ...initialState,
    //   view: 'Inbox'
    // });
});
test('reducer changes state and renders correctly', () => {
  expect(header(initialState, {type: 'CHANGE_VIEW', payload: 'Filter'})).toMatchSnapshot();
});

//TESTING ACTIONS
test('Creates changeview action for Inbox', () => {
  expect(headerActions.changeView('Inbox')).toMatchSnapshot();
});
test('Creates changeview action for Playlist', () => {
  expect(headerActions.changeView('Playlist')).toMatchSnapshot();
});
