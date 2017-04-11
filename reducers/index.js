import { types } from '../actions';

// add your key/values for initialState here
const initialState = {
  currentEpisodeTitle: null,
  currentPlayingTime: '0:00',
  currentSoundInstance: null,
  currentSpeed: 1.0,
  isModalVisible: false,
  isPlaying: false,
  modalVisible: false,
  view: 'Inbox',
  //sample until call to API is setup
  iTunesResult: JSON.parse('{"wrapperType":"track", "kind":"podcast", "collectionId":592681501, "trackId":592681501, "artistName":"Black Astronauts Podcast Network", "collectionName":"Black Astronauts Podcast Network", "trackName":"Black Astronauts Podcast Network", "collectionCensoredName":"Black Astronauts Podcast Network", "trackCensoredName":"Black Astronauts Podcast Network", "collectionViewUrl":"https://itunes.apple.com/us/podcast/black-astronauts-podcast-network/id592681501?mt=2&uo=4", "feedUrl":"http://blackastronautspodcast.libsyn.com/rss", "trackViewUrl":"https://itunes.apple.com/us/podcast/black-astronauts-podcast-network/id592681501?mt=2&uo=4", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Music71/v4/7d/a2/6e/7da26ee8-e7fc-2cf9-42b3-95e12ef452f8/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music71/v4/7d/a2/6e/7da26ee8-e7fc-2cf9-42b3-95e12ef452f8/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music71/v4/7d/a2/6e/7da26ee8-e7fc-2cf9-42b3-95e12ef452f8/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-10T14:02:00Z", "collectionExplicitness":"explicit", "trackExplicitness":"explicit", "trackCount":9, "country":"USA", "currency":"USD", "primaryGenreName":"Comedy", "contentAdvisoryRating":"Explicit", "artworkUrl600":"http://is2.mzstatic.com/image/thumb/Music71/v4/7d/a2/6e/7da26ee8-e7fc-2cf9-42b3-95e12ef452f8/source/600x600bb.jpg", "genreIds":["1303", "26", "1324", "1323", "1404"], "genres":["Comedy", "Podcasts", "Society & Culture", "Games & Hobbies", "Video Games"]}'),
  //sample until DB is set up
  podcast: {title: 'Note to Self', liked: true, bookmark: false, tag: 'Tech News', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', creator: 'NPR', feed: {"title":"Deep-Dark-Data-Driven Politics\r\n","link":"http://www.wnyc.org/story/cambridge-analytica-psychometrics/","duration":"26:14","subtitle":" Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca","pubDate":"Wed, 29 Mar 2017 00:00:00 -0400","enclosure":{"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3","length":0,"type":"audio/mpeg"}}}
};

// store.dispatch(...) is what triggers the reducer
export const reducer = (state = initialState, action) => {
  if (action.type === types.CHANGE_GREETING) {
    return {...state, greeting: action.payload};
  }
  if (action.type === types.SET_PLAY_STATUS) {
    return {...state, isPlaying: action.payload}
  }
  if (action.type === types.UPDATE_CURRENT_PLAYING_TIME) {
    return {...state, currentPlayingTime: action.payload}
  }
  if (action.type === types.DECREASE_SPEED) {
    return {...state, currentSpeed: (state.currentSpeed - action.payload)}
  }
  if (action.type === types.INCREASE_SPEED) {
    return {...state, currentSpeed: (state.currentSpeed + action.payload)}
  }
  if (action.type === types.SET_MODAL_VISIBLE) {
    return {...state, isModalVisible: action.payload}
  }
  if (action.type === types.CHANGE_VIEW) {
    return {...state, view: action.payload};
  }
  if (action.type === types.TOGGLE_MODAL) {
    return {...state, modalVisible: !state.modalVisible};
  }
  if (action.type === types.CREATE_NEW_SOUND_INSTANCE) {
    return {...state, currentSoundInstance: action.payload};
  }
  if (action.type === types.UPDATE_CURRENTLY_PLAYING_EPISODE) {
    return {...state, currentEpisodeTitle: action.payload}
  }

  return state;
}
