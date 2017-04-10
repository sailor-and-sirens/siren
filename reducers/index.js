import { types } from '../actions';

// add your key/values for initialState here
const initialState = {greeting: 'Hello there!',
//sample until call to API is setup
iTunesResult: JSON.parse('{"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]}'),
//sample until DB is set up
podcast: {title: 'Note to Self', liked: true, bookmark: false, tag: 'technology', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', creator: 'NPR', feed: {"title":"Deep-Dark-Data-Driven Politics\r\n","link":"http://www.wnyc.org/story/cambridge-analytica-psychometrics/","duration":"26:14","subtitle":" Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca","pubDate":"Wed, 29 Mar 2017 00:00:00 -0400","enclosure":{"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3","length":0,"type":"audio/mpeg"}}}};

// store.dispatch(...) is what triggers the reducer
export const reducer = (state = initialState, action) => {
  /*
    if (action.type === types.ACTION_TYPE) {
      return {...state, stateToChange: action.payload}
    }
  */
  if (action.type === types.CHANGE_GREETING) {
    return {...state, greeting: action.payload};
  }

  return state;
}
