import React from 'react';
import PlaylistList from '../components/PlaylistList.js';
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
      <PlaylistList />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


//To retake snapshot: npm test -- -u PlaylistList
