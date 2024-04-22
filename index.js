import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import App from './App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => require('./service'));

// miguel

console.log('pasó por index.js');