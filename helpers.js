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

export const hmsToSecondsOnly = (duration) => {
  var p = duration.split(':'),
      s = 0, m = 1;

  while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
  }
  return s;
}

export const _userSignup = () => {
    if(this.state.password === '' || this.state.username === '' || this.state.email === '') {
      Alert.alert('Missing fields');
      return;
    }
    if(this.state.password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return;
    }
    if(!this.state.email.includes('@')) {
      Alert.alert('Please enter a valid email.');
      return;
    }
    var value = {username: this.state.username, password: this.state.password, email: this.state.email, avatarUrl: this.state.avatarUrl};
      fetch("http:localhost:3000/api/users/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      .then((response) => {
        if (response.status !== 201) {
          response.json()
          .then((responseData) => Alert.alert(responseData.message))
          .catch(console.warn);
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {
          this.props.dispatch(actionCreators.changeView('Inbox'))
          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch((error) => {
        console.warn('Error: ', error);
      })
      .done();
  }

export const _userLogin = () => {
    if(this.state.password === '' || this.state.username === '') {
      Alert.alert('Missing fields');
      return;
    }
    var value = {username: this.state.username, password: this.state.password};
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
       .then((response) => {
        if (response.status !== 201) {
          response.json()
          .then((responseData) => Alert.alert(responseData.message))
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {
          this.props.dispatch(actionCreators.changeView('Inbox'))
          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch((error) => {
        console.warn('Error: ', error);
      })
      .done();
  }
