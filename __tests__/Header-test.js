import React from 'react';
import Header from '../components/Header.js';
import header from '../reducers/Header.js';
import { initialState } from '../reducers/Header.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

//TESTING REACT COMPONENT
test('renders correctly', () => {
  const tree = renderer.create(
    //wrap component in provide so it has access to store
    <Provider store={store}>
      <Header />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//TESTING REDUCERS
test('reducer returns default state and renders correctly', () => {
  //Test ensures state is being changed correctly
  expect(header(initialState, {type: '_NULL'})).toEqual({
    ...initialState,
    view: 'Inbox' //this is the only part of initialState we need to test so it is explicitly mentioned
  });
  //Test ensures component is rendered correctly with default state
  expect(header(initialState, {type: '_NULL'})).toMatchSnapshot();
});

test('reducer changes state and renders correctly', () => {
  expect(header(initialState, {type: 'CHANGE_VIEW', payload: 'Filter'})).toEqual({
    ...initialState,
    view: 'Filter'
  });
  expect(header(initialState, {type: 'CHANGE_VIEW', payload: 'Filter'})).toMatchSnapshot();
});


//To retake snapshot: npm test -- -u Header
