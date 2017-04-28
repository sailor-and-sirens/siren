import React from 'react';
import PlaylistCard from '../components/PlaylistCard.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

var playlist = {
  title: 'Test playlist',
  Episodes: [{title: 'one episode', Podcast: {artworkUrl: 'test.com'}}],
  totalTime: 100
}

test('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <PlaylistCard playlist={playlist} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
