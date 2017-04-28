export const removeCurrentEpisodeFromListeningTo = (token, episodeId) => {
  let episodeData = { episodeId };
  fetch('http://siren-server.herokuapp.com/api/playlists/listening-to', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(episodeData)
  })
  .catch(console.log);
}
