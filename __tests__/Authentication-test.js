import React from 'react';
import Authentication from '../components/Authentication.js';
import reducer from '../reducers/index';
import { initialState } from '../reducers/index.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header.js';
const store = createStore(reducer);

test('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Authentication />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//TEST REDUCER
test('reducer returns default state and renders correctly', () => {
  expect(reducer(initialState, {type: '_NULL'})).toMatchSnapshot();
});

test('reducer changes state and renders correctly', () => {
  expect(reducer(initialState, {type: 'CHANGE_USERNAME', payload: 'test'})).toMatchSnapshot();
});

test('reducer changes state and renders correctly', () => {
  expect(reducer(initialState, {type: 'CHANGE_USERNAME', payload: 'username'})).toMatchSnapshot();
});

test('reducer changes state and renders correctly', () => {
  expect(reducer(initialState, {type: 'CHANGE_PASSWORD', payload: 'password'})).toMatchSnapshot();
});

test('Creates changeview action for Inbox', () => {
  expect(headerActions.changeView('Inbox')).toMatchSnapshot();
});
test('Creates changeview action for Playlist', () => {
  expect(actionCreators.changeUsername('username')).toMatchSnapshot();
});
test('Creates changeview action for Playlist', () => {
  expect(actionCreators.changeUsername('password')).toMatchSnapshot();
});
