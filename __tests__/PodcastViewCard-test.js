import React from 'react';
import PodcastViewCard from '../components/PodcastViewCard.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

var podcast = {"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]};

//TESTING REACT COMPONENT
test('renders correctly', () => {
  const tree = renderer.create(
    //wrap component in provide so it has access to store
    <Provider store={store}>
      <PodcastViewCard podcast={podcast}/>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//To retake snapshot: npm test -- -u PodcastViewCard