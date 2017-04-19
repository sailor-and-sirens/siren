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

export const deselectSelectedPlaylists = (isPlaylistSelected, playlists) => {
  if (isPlaylistSelected) {
    return playlists.map(playlist => {
      playlist.isSelected = false;
      return playlist
    });
  }
  return playlists;
}
