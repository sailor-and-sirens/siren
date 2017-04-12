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
iTunesResult: [
{"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]},
{"wrapperType":"track", "kind":"podcast", "collectionId":305727517, "trackId":305727517, "artistName":"Note to Beautiful Self", "collectionName":"Note to Beautiful Self", "trackName":"Note to Beautiful Self", "collectionCensoredName":"Note to Beautiful Self", "trackCensoredName":"Note to Beautiful Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "feedUrl":"http://www.blogtalkradio.com/note2beautifulself/podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2015-04-12T21:30:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":39, "country":"USA", "currency":"USD", "primaryGenreName":"Careers", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/600x600bb.jpg", "genreIds":["1410", "26", "1321"], "genres":["Careers", "Podcasts", "Business"]},
{"wrapperType":"track", "kind":"podcast", "collectionId":1197015104, "trackId":1197015104, "artistName":"C David Baker", "collectionName":"Notes to Self", "trackName":"Notes to Self", "collectionCensoredName":"Notes to Self", "trackCensoredName":"Notes to Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "feedUrl":"http://cdbaker.podomatic.com/rss2.xml", "trackViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-07T20:41:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":9, "country":"USA", "currency":"USD", "primaryGenreName":"Literature", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/600x600bb.jpg", "genreIds":["1401", "26", "1301"], "genres":["Literature", "Podcasts", "Arts"]}],
//sample until DB is set up
inbox: [{title: 'Note to Self', liked: true, bookmark: false, tag: 'Tech News', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', creator: 'NPR', feed: {title:"Deep-Dark-Data-Driven Politics\r\n", link:"http://www.wnyc.org/story/cambridge-analytica-psychometrics/", duration:"26:14", subtitle:" Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca", pubDate: "Wed, 29 Mar 2017 00:00:00 -0400", enclosure: {"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3", length: 0, type: "audio/mpeg"}}},
{title: 'Science VS', liked: false, bookmark: true, tag: 'Science', image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/100x100bb.jpg', creator: 'Gimlet', feed: {title:"Death, Lies and Lemmings",duration: "17:93",subtitle: "Science Vs The News + a Surprise",pubDate: "Thu, 06 Apr 2017 15:07:00 -0000", enclosure:{"url":"http://traffic.megaphone.fm/GLT9261655165.mp3",length: 43051258, type: "audio/mpeg"}}}]
};

// store.dispatch(...) is what triggers the reducer
export const reducer = (state = initialState, action) => {
  if (action.type === types.CHANGE_GREETING) {
    return {...state, greeting: action.payload};
  }
  if (action.type === types.CHANGE_VIEW) {
    return {...state, view: action.payload};
  }
  if (action.type === types.CREATE_NEW_SOUND_INSTANCE) {
    return {...state, currentSoundInstance: action.payload};
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
  if (action.type === types.SET_PLAY_STATUS) {
    return {...state, isPlaying: action.payload}
  }
  if (action.type === types.TOGGLE_MODAL) {
    return {...state, modalVisible: !state.modalVisible};
  }
  if (action.type === types.UPDATE_CURRENT_PLAYING_TIME) {
    return {...state, currentPlayingTime: action.payload}
  }
  if (action.type === types.UPDATE_CURRENTLY_PLAYING_EPISODE) {
    return {...state, currentEpisodeTitle: action.payload}
  }

  return state;
}
