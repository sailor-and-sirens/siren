import { actionCreators as playerActions } from './actions/Player';
import { actionCreators as podcastsActions } from './actions/Podcasts';
import { actionCreators as swipeActions } from './actions/Swipe';
import { actionCreators as mainActions } from './actions';
import { actionCreators as playlistActions } from './actions/Playlist';

let _ = require('lodash');

export const truncateTitle = (title) => {
  if (!title) return '';
  let truncatedTitle = [];
  let currentLength = 0;
  if (title.length <= 45) return title;
  title.split(' ').forEach(word => {
    if (word.length + currentLength <= 45) {
      truncatedTitle.push(word);
      currentLength += word.length;
    };
  });
  return truncatedTitle.join(' ') + '...';
}

export const convertMillis = (millis) => {
  let seconds = (millis / 1000).toFixed(0);
  let hours = parseInt( seconds / 3600 );
  seconds = seconds % 3600;
  let minutes = parseInt( seconds / 60 );
  seconds = seconds % 60;
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const removeItemFromObjectById = (object, id) => {
  return Object.keys(object).reduce((accum, key) => {
    if (key !== id) accum[key] = object[key];
    return accum;
  }, {});
}

export const hmsToSecondsOnly = (duration) => {
  var p = duration.split(':'),
      s = 0, m = 1;

  while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
  }
  return s;
}

export const subscribePodcast = (props) => {
    fetch("http://siren-server.herokuapp.com/api/podcasts/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify(props.podcast)
    })
    .then(() => {
      fetch("http://siren-server.herokuapp.com/api/users/inbox", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': props.token
        },
      })
    })
    .then(inbox => inbox.json())
    .then((inbox) => {
      props.dispatch(mainActions.updateInbox(inbox));
    })
    .catch((err) => console.log(err));
  }

export const updateInbox = (props) => {
    props.dispatch(podcastsActions.toggleSearchSpinner(true));
    fetch("http://siren-server.herokuapp.com/api/users/inbox", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': props.token
      },
    })
    .then(inbox => inbox.json())
    .then((inbox) => {
      props.dispatch(mainActions.updateInbox(inbox));
      props.dispatch(podcastsActions.toggleSearchSpinner(false));
    })
    .catch((err) => console.warn(err));
  }

export const toggleLike = (id, props) => {
    id = parseInt(id);
    var inbox = _.cloneDeep(props.inbox);
    inbox[id].liked = !inbox[id].liked;
    props.dispatch(mainActions.toggleLike(inbox));
    props.dispatch(playerActions.storeEpisodeData(inbox[id]));
    fetch("http://siren-server.herokuapp.com/api/users/likeEpisode", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({id: id, liked: !props.inbox[id].liked})
    })
  }

export const toggleBookmark = (id, props) => {
    id = parseInt(id);
    var inbox = _.cloneDeep(props.inbox);
    inbox[id].bookmark = !inbox[id].bookmark;
    props.dispatch(mainActions.toggleBookmark(inbox));
    props.dispatch(playerActions.storeEpisodeData(inbox[id]));
    fetch("http://siren-server.herokuapp.com/api/users/bookmarkEpisode", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({id: id, bookmark: !props.inbox[id].bookmark})
    })
    .then(() => getAllPlaylists(props))
  };

export const getAllPlaylists = (props) => {
    var that = this;
    fetch("http://siren-server.herokuapp.com/api/playlists/get-playlists", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.token
      }
    })
    .then(function(data){
      console.log('GOT DATA')
      var data = data.json().then(function(data){
        props.dispatch(playlistActions.getPlaylists(data));
      });
    })
  }
