import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event,
  } from 'react-native-track-player';
  
  export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  };
  
  export async function addTracks() {
    await TrackPlayer.add([
      {
        id: '1',
        url: 'https://streaming.shoutcast.com/radio-65',
        title: 'Radio Miguel',
        artist: 'migben',
        duration: 60,
      },
      {
        id: '2',
        url: 'https://streaming.shoutcast.com/gs-la-super-estacion',
        title: 'Modern Chillout',
        artist: 'penguinmusic',
        duration: 66,
      },
      {
        id: '3',
        url: 'https://streaming.shoutcast.com/la-jl',
        title: 'Powerful Beat',
        artist: 'penguinmusic',
        duration: 73,
      }
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };
  
  export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
      console.log('Event.RemotePause');
      TrackPlayer.pause();
    });
  
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      console.log('Event.RemotePlay');
      TrackPlayer.play();
    });
  
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
      console.log('Event.RemoteNext');
      TrackPlayer.skipToNext();
    });
  
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      console.log('Event.RemotePrevious');
      TrackPlayer.skipToPrevious();
    });
  }