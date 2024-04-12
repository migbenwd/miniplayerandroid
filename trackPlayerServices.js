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
        title: 'RADIO 65',
        duration: 66,
        artwork: 'https://noticieroaltavoz.com/wp-content/uploads/2024/01/RADIO-65-BLANCO.png',
      },
      {
        id: '2',
        url: 'https://streaming.shoutcast.com/gs-la-super-estacion',
        title: 'LA GS SUPER ESTACIÓN',
        duration: 66,
        artwork: 'https://noticieroaltavoz.com/wp-content/uploads/2024/01/LA-GS-BLANCO.png',
      },
      {
        id: '3',
        url: 'https://streaming.shoutcast.com/la-jl',
        title: 'LA JL',
        duration: 66,
        artwork: 'https://noticieroaltavoz.com/wp-content/uploads/2024/01/LA-JL-BLANCO.png',
      },
      {
        id: '4',
        url: 'https://streaming.shoutcast.com/la-maxi-gml',
        title: 'LA MAXI GML',
        duration: 73,
        artwork: 'https://noticieroaltavoz.com/wp-content/uploads/2024/01/A-MAXI-GML-1.png',
      },
      {
        id: '5',
        url: 'https://streaming.shoutcast.com/la-maxi',
        title: 'LA MAXI',
        duration: 73,
        artwork: 'https://noticieroaltavoz.com/wp-content/uploads/2024/01/A-MAXI-LOGO-CONTORNO-BCO-1.png',
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