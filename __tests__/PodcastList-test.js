import React from 'react';
import PodcastList from '../components/PodcastList.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';
const store = createStore(reducer);

var podcasts = [

  {"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]},

  {"wrapperType":"track", "kind":"podcast", "collectionId":305727517, "trackId":305727517, "artistName":"Note to Beautiful Self", "collectionName":"Note to Beautiful Self", "trackName":"Note to Beautiful Self", "collectionCensoredName":"Note to Beautiful Self", "trackCensoredName":"Note to Beautiful Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "feedUrl":"http://www.blogtalkradio.com/note2beautifulself/podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2015-04-12T21:30:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":39, "country":"USA", "currency":"USD", "primaryGenreName":"Careers", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/600x600bb.jpg", "genreIds":["1410", "26", "1321"], "genres":["Careers", "Podcasts", "Business"]},

  {"wrapperType":"track", "kind":"podcast", "collectionId":1197015104, "trackId":1197015104, "artistName":"C David Baker", "collectionName":"Notes to Self", "trackName":"Notes to Self", "collectionCensoredName":"Notes to Self", "trackCensoredName":"Notes to Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "feedUrl":"http://cdbaker.podomatic.com/rss2.xml", "trackViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-07T20:41:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":9, "country":"USA", "currency":"USD", "primaryGenreName":"Literature", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/600x600bb.jpg", "genreIds":["1401", "26", "1301"], "genres":["Literature", "Podcasts", "Arts"]}
];

//TESTING REACT COMPONENT
test('renders correctly without data', () => {
  const tree = renderer.create(
    //wrap component in provide so it has access to store
    <Provider store={store}>
      <PodcastList podcasts={podcasts} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});



//To retake snapshot: npm test -- -u PodcastList
