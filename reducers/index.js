import { combineReducers } from 'redux';
import { types } from '../actions';
import player from './Player';

// add your key/values for initialState here
const initialState = {
  modalVisible: false,
  view: 'Inbox',
  //sample until call to API is setup
  inboxFilters: {
    liked: "likedOff",
    bookmarked: "bookmarkedOff",
    time: "timeOff",
    tag: "All"
  },

iTunesResult: [

  {"wrapperType":"track", "kind":"podcast", "artistId":127981066, "collectionId":561470997, "trackId":561470997, "artistName":"WNYC Studios", "collectionName":"Note to Self", "trackName":"Note to Self", "collectionCensoredName":"Note to Self", "trackCensoredName":"Note to Self", "artistViewUrl":"https://itunes.apple.com/us/artist/wnyc/id127981066?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "feedUrl":"http://feeds.wnyc.org/notetoself-podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-self/id561470997?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-05T04:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":87, "country":"USA", "currency":"USD", "primaryGenreName":"Tech News", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg", "genreIds":["1448", "26", "1318"], "genres":["Tech News", "Podcasts", "Technology"]},

  {"wrapperType":"track", "kind":"podcast", "collectionId":305727517, "trackId":305727517, "artistName":"Note to Beautiful Self", "collectionName":"Note to Beautiful Self", "trackName":"Note to Beautiful Self", "collectionCensoredName":"Note to Beautiful Self", "trackCensoredName":"Note to Beautiful Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "feedUrl":"http://www.blogtalkradio.com/note2beautifulself/podcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/note-to-beautiful-self/id305727517?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2015-04-12T21:30:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":39, "country":"USA", "currency":"USD", "primaryGenreName":"Careers", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music71/v4/41/27/e2/4127e299-472c-4fe6-c6bd-bb2594b39d03/source/600x600bb.jpg", "genreIds":["1410", "26", "1321"], "genres":["Careers", "Podcasts", "Business"]},

  {"wrapperType":"track", "kind":"podcast", "collectionId":1197015104, "trackId":1197015104, "artistName":"C David Baker", "collectionName":"Notes to Self", "trackName":"Notes to Self", "collectionCensoredName":"Notes to Self", "trackCensoredName":"Notes to Self", "collectionViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "feedUrl":"http://cdbaker.podomatic.com/rss2.xml", "trackViewUrl":"https://itunes.apple.com/us/podcast/notes-to-self/id1197015104?mt=2&uo=4", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-07T20:41:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":9, "country":"USA", "currency":"USD", "primaryGenreName":"Literature", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is2.mzstatic.com/image/thumb/Music111/v4/8b/f6/0f/8bf60f3d-da43-c1d8-0d89-096f36a4b7e2/source/600x600bb.jpg", "genreIds":["1401", "26", "1301"], "genres":["Literature", "Podcasts", "Arts"]}
],
//sample until DB is set up
inbox: [

  {id: 1, title: 'Note to Self', liked: true, bookmark: false, tag: 'Tech News', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', image600: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg', creator: 'NPR', feed: {title:"Deep-Dark-Data-Driven Politics\r\n", link:"http://www.wnyc.org/story/cambridge-analytica-psychometrics/", duration:"00:26:14", subtitle:" Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca", pubDate: "Wed, 29 Mar 2017 00:00:00 -0400", enclosure: {"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3", length: 0, type: "audio/mpeg"}}},

  {id: 2 , title: 'Science VS', liked: false, bookmark: true, tag: 'Science', image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/100x100bb.jpg', image600: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/600x600bb.jpg', creator: 'Gimlet Media', feed: {title:"Death, Lies and Lemmings",duration:"00:17:93",subtitle:"Science Vs The News + a Surprise",pubDate:"Thu, 06 Apr 2017 15:07:00 -0000",enclosure:{"url":"http://traffic.megaphone.fm/GLT9261655165.mp3",length:43051258,type:"audio/mpeg"}}},

  {id: 3 , title: 'Science VS' , liked: true, bookmark: false, tag: 'Science', image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/100x100bb.jpg', image600: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/600x600bb.jpg', creator: 'Gimlet Media', feed:{title:"Climate Change... the Apocalypse? ",duration:"00:25:93",subtitle:"How bad will it get and how do scientists know humans are to blame?",pubDate:"Thu, 16 Mar 2017 15:54:00 -0000",enclosure:{"url":"http://traffic.megaphone.fm/GLT4607516870.mp3",length:62237466,type:"audio/mpeg"}}},

  {id: 4 , title: 'Science Vs', liked: false, bookmark: false, tag: 'Science', image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/100x100bb.jpg', image600: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/600x600bb.jpg', creator: 'Gimlet Media', feed: {title:"Immigration",duration:"00:27:00",subtitle:"Are immigrants bad for America? ",pubDate:"Thu, 09 Mar 2017 20:00:00 -0000",enclosure:{url:"http://traffic.megaphone.fm/GLT9750488370.mp3?updated=1489088490",length:64801018,type:"audio/mpeg"}}},

  {id: 5 , title: 'Note to Self', liked: false, bookmark: false, tag: 'Technology', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', image600: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg', creator: 'WNYC Studios', feed: {title:"Spring Cleaning for the Min",link:"http://www.wnyc.org/story/infomagical-focus-bootcamp/",duration:"00:17:35",subtitle:" There is a lot to take in in our world right now. And there are a lot of ways to do it. You can read articles posted by your Facebook friends, or by the journalists you follow on Twitter. You can watch cable news with your morning oatmeal. Which makes it",pubDate:"Wed, 12 Apr 2017 00:00:00 -0400",enclosure:{url:"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself041217_cms749087_pod.mp3",length:0,type:"audio/mpeg"}}},

  {id: 6 , title: 'Note to Self', liked: false, bookmark: true, tag: 'Technology', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', image600: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg', creator: 'WNYC Studios', feed: {title:"Zapping Your Brain To Blis",link:"http://www.wnyc.org/story/wearable-tech-brain-boost/",duration:"00:19:25",subtitle:" At Manoush’s house, there’s an object the size of a big potato chip. Which she stuck to her forehead, and used to zap her brain. This brain stimulation is supposed to calm you down. Maybe replace a glass of wine, just wind you down a little. But it turns",pubDate:"Wed, 01 Mar 2017 00:00:00 -0500",enclosure:{url:"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself030117_cms739269_pod.mp3",length:0,type:"audio/mpeg"}}},

  {id: 7 , title: 'Note to Self', liked: false, bookmark: false, tag: 'Technology', image: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/100x100bb.jpg', image600: 'http://is3.mzstatic.com/image/thumb/Music111/v4/d6/04/42/d60442fb-dbc3-22e0-e23b-121cef5d511e/source/600x600bb.jpg', creator: 'WNYC Studios', feed: {title:"Will You Do a Snapchat Streak With Me?",link:"http://www.wnyc.org/story/snapchat-ipo/",duration:"00:18:07",subtitle:" If you are between the ages of 18 and 34, there’s a good chance you’ve already checked Snapchat today. This week, Manoush joins you—despite her reservations. Those reservations are not just because the Note to Self team isn’t the app’s target demo.",pubDate:"Wed, 08 Mar 2017 00:00:00 -0500",enclosure:{url:"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself030817_cms740978_pod.mp3",length:0,type:"audio/mpeg"}}}
  ]
}

// store.dispatch(...) is what triggers the reducer
const main = (state = initialState, action) => {
  if (action.type === types.CHANGE_VIEW) {
    return {...state, view: action.payload};
  }
  if (action.type === types.TOGGLE_MODAL) {
    return {...state, modalVisible: !state.modalVisible};
  }
  if (action.type === types.TOGGLE_LIKE) {
    return {...state, inbox: action.payload}
  }
  if (action.type === types.TOGGLE_BOOKMARK) {
    return {...state, inbox: action.payload}
  }
  if (action.type === types.UPDATE_LIKED_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, liked: action.payload}}
  }
  if (action.type === types.UPDATE_BOOKMARKED_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, bookmarked: action.payload}}
  }
  if (action.type === types.UPDATE_TIME_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, time: action.payload}}
  }
  if (action.type === types.UPDATE_TAG_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, tag: action.payload}}
  }

  return state;
}

const rootReducer = combineReducers({
  main,
  player
});

export default rootReducer;
