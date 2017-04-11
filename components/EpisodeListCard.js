import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  podcast: state.podcast
})

hmsToSecondsOnly = (duration) => {
    var p = duration.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}

var renderClock = (duration) => {
  if(duration.length < 5) {
    duration = '00:' + duration;
  }
  duration = hmsToSecondsOnly(duration);
  if (duration <= 300) {
    return <Image source={require('../assets/clockIcons/clock5.png')} style={styles.clock} />
  }
  if (duration <= 900) {
    return <Image source={require('../assets/clockIcons/clock15.png')} style={styles.clock} />
  }
  if (duration <= 1800) {
    return <Image source={require('../assets/clockIcons/clock30.png')} style={styles.clock} />
  }
  if (duration <= 2700) {
    return <Image source={require('../assets/clockIcons/clock45.png')} style={styles.clock} />
  }
  if (duration > 2700) {
    return <Image source={require('../assets/clockIcons/clock60.png')} style={styles.clock} />
  }
};

var renderBookmark = (bookmark) => {
  if (bookmark) {
    return <Ionicons style={styles.favorite} size={25} color='grey' name="ios-bookmark"/>
  }
  return <Ionicons style={styles.favorite} size={25} color='grey' name="ios-bookmark-outline"/>
};

var renderHeart = (liked) => {
  if (liked) {
    return <Ionicons style={styles.favorite} size={25} color='grey' name="ios-heart"/>
  }
  return <Ionicons style={styles.favorite} size={25} color='grey' name="ios-heart-outline"/>
};

class EpisodeListCard extends Component {

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <View style={styles.leftView}>
            <Image source={{uri: this.props.podcast.image}} style={styles.image}/>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.date}>{this.props.podcast.feed.pubDate.substring(0,16)}</Text>
            <Text style={styles.episode} numberOfLines={1}>{this.props.podcast.feed.title}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{this.props.podcast.feed.subtitle}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.tag}> {this.props.podcast.tag} </Text>
          <View style={styles.timeView}>
            {renderClock(this.props.podcast.feed.duration)}
            <Text style={styles.time}>{this.props.podcast.feed.duration}</Text>
          </View>
          {renderBookmark(this.props.podcast.bookmark)}
          {renderHeart(this.props.podcast.liked)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    flex: .75,
    marginBottom: 8,
    marginTop: 10,
    paddingRight: 5,
  },
  leftView: {
    flex: .25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightView: {
    paddingLeft: 3,
    flex: .75,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
  },
  bottomView: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 8,
  },
  mainView: {
    height: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  image: {
    height: 80,
    width: 80,
  },
  episode: {
    fontWeight: "500",
    fontSize: 16,
  },
  subtitle: {
  fontWeight: "400",
  fontSize: 12,
  },
  podcast: {
    fontWeight: "600",
    fontSize: 16,
  },
  tag: {
    backgroundColor: '#42f4c5',
    alignSelf: 'center',
    padding: 2,
  },
  date: {
    fontWeight: "400",
    fontSize: 12,
  },
  time: {
    fontWeight: "400",
    fontSize: 14,
    marginRight: 5,
    color: 'grey',
  },
  favorite: {
    alignSelf: 'center',
  },
  bookmark: {
    alignSelf: 'center',
  },
  clock: {
    marginRight: 7,
    height: 21,
    width: 21,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps)(EpisodeListCard);