import React from 'react';
import PlaylistList from '../components/PlaylistList.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

test('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <PlaylistList />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
