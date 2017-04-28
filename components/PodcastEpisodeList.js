import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as swipeActions } from '../actions/Swipe';
import PodcastEpisodeListCard from './PodcastEpisodeListCard';

const mapStateToProps = (state) => ({
  currentlyOpenSwipeable: state.swipe.currentlyOpenSwipeable,
  episodes: state.podcasts.podcastEpisodes,
  filters: state.main.inboxFilters,
  token: state.main.token,
});

class PodcastEpisodeList extends Component {

  render() {
    const { currentlyOpenSwipeable } = this.props;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }
        this.props.dispatch(swipeActions.toggleOpenSwipeable(swipeable));
      },
      onClose: () => this.props.dispatch(swipeActions.toggleOpenSwipeable(null))
    };
   return (
        <View style={styles.mainView}>
           <View style={styles.PodcastEpisodeList}>
            {this.props.episodes.map((episode, key) => (
                <PodcastEpisodeListCard {...itemProps}
                  episode={episode}
                  handlePlay={this.handlePlay}
                  handleRemovePlayingEpisode={this.handleRemovePlayingEpisode}
                  id={key}
                  key={key}/>
              ))}
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PodcastEpisodeList:{
    width: '100%',
  },
})

export default connect(mapStateToProps)(PodcastEpisodeList);
