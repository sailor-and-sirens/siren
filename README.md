# Siren
> Discover podcasts you’ll love, organized just the way you want them.

[https://sailor-and-sirens.github.io/](https://sailor-and-sirens.github.io/)

## Setup

1. Install [Expo XDE](https://docs.expo.io/versions/v16.0.0/introduction/installation.html)
2. Clone the repo and run 'npm install' to install dependencies  
3. Open the project in Expo XDE and run on a mobile device or emulator

The server/database repository is available [here](https://github.com/sailor-and-sirens/siren-server).

## Team
[@lmegviar](https://github.com/lmegviar) | [@danyadsmith](https://github.com/danyadsmith) | [@livfwd](https://github.com/livfwd) | [@brycegit](https://github.com/brycegit)

## Features

### Inbox
The inbox view gathers episodes from all of your subscriptions in one place.

- Determine episode length at a glance via the time indicator icons.
- Bookmark episodes to add them to your bookmarked playlist for future listening.
- Favorite the episodes you enjoy most.
- Swipe episode cards to the left to remove them from your inbox.
- Swipe episode cards to the right to add them to a playlist.

### Filter
Filter your inbox to find just the episodes you’re looking for.

- Filter by: podcast name, duration, bookmark, like, tag, and playlist

### Playlists
Organize your episodes into playlists for future listening.

- Default Bookmarked and Listening To playlists save your bookmarked and in-progress episodes.
- Create playlists and add to them by swiping episodes cards to the right in inbox view.
- Use playlist view to explore your current lists or create a new one.
- See the total duration of your playlists.

### Player
Siren’s player includes all of your favorite features.

- Fast-forward and rewind
- Speed control
- Skip ahead / skip back
- Full-size player view provides additional episode information and a friendly interface for controlling playback on the go

### Search
Find and subscribe to your favorite podcasts.

- Search powered by iTunes
- Swipe to the right or click the plus to subscribe to podcasts
- Click a podcast image to see the podcast card with more information and previous episodes
- Swipe podcast episodes to the right to add them to the inbox, even without subscribing to the podcast
- From the podcast card, click “More Like This” to see similar podcasts

### Subscriptions
Stay up-to-date on your favorite podcasts.

- The last three episodes of a podcast are added to your inbox on subscribe.
- Older episodes of a podcast can be added directly from the podcast card in search.
- New episodes are added directly to your inbox.
- Go to Settings > “Manage Subscriptions” to remove subscriptions with a swipe to the left

### Discovery
Find and subscribe to your favorite podcasts.

- See recommendations based on your current subscriptions.
- View similar podcasts after clicking “More Like This” in the podcast view card.
- Suggestions formulated based on related genres and content analysis of podcast titles and descriptions using IBM Watson.

### Authentication
Access your podcasts from any device.

- A token stored in your phone’s async storage on sign-in keeps you logged between visits to the app.
- User passwords are hashed before being added to the token, providing added security.
