import React from 'react';
import PodcastViewCard from '../components/PodcastViewCard.js';
import * as renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index';

const fakeStore = (state) => {
  return {
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return { ...state }
    }
  };
}

const initialStateSwipe = {
  currentlyOpenSwipeable: false
}

const initialState = {
  episodesLoading: false,
  currentPodcast: {"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]},
  podcastEpisodes: [
  {
    "title": "CARTA: Awareness of Death and Personal Mortality: Implications for Anthropogeny – Mind Over Reality Transition: The Evolution of Human Mortality Denial; Human Mortality Denial and Terror Management Theory; The Lure of Death: Suicide as a Uniquely Human Phenomenon",
    "enclosure": {
      "filesize": 27844374,
      "type": "audio/mpeg",
      "url": "http://podcast.uctv.tv/mp3/32048.mp3",
    podcast:{
      description: {
        "long": "test"
      }
     }
    },
    "guid": "32048carta-awareness-of-death-and-personal-mortality-implications-for-anthropogeny-–-“mind-over-reality-transition”-the-evolution-of-human-mortality-denial-human-mortality-denial-and-terror-management-theory-the-lure-of-death-suicide-as-a-uniquely-human-phenomenon",
    "published": "2017-05-24T21:00:00.000Z",
    "duration": "00:57:50",
    "description": "Ajit Varki explores the human capacity for denial of reality and how that has shaped our evolution; Sheldon Solomon different philosophies surrounding mortality; and Nicholas Humphrey provides a comprehensive look at the motivations for, prevalence of and reactions to the uniquely human act for suicide.  Series: &quot;CARTA - Center for Academic Research and Training in Anthropogeny&quot; [Humanities] [Science] [Show ID: 32048]"
  }]
}

const initialStateMain = {
  token: null,
  inboxFilters: null
}

const initialStatePlayer = {
  currentEpisode: null
}

const store = fakeStore({podcasts: initialState, main: initialStateMain, swipe: initialStateSwipe, player: initialStatePlayer});

test("Podcast view renders a podcast's info", () => {
  const tree = renderer.create(
    //wrap component in provide so it has access to store
    <Provider store={store}>
      <PodcastViewCard />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//To retake snapshot: npm test -- -u PodcastViewCard