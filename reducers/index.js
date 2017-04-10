import { types } from '../actions';

// add your key/values for initialState here
const initialState = {greeting: 'Hello there!', podcast: {title: 'Note to Self', favorite: true, tag: 'technology', image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/25/1a/3a/251a3a40-c10d-0047-d93f-ae3ae0b5b480/source/100x100bb.jpg', creator: 'NPR', feed: {"title":"Deep-Dark-Data-Driven Politics\r\n","link":"http://www.wnyc.org/story/cambridge-analytica-psychometrics/","duration":"26:14","subtitle":" Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca","pubDate":"Wed, 29 Mar 2017 00:00:00 -0400","enclosure":{"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3","length":0,"type":"audio/mpeg"}}}};

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
