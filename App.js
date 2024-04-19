import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setupPlayer, addTracks } from './trackPlayerServices';

function NombreEmisora() {
  
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if(event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return(
    <View>
        <Text style={styles.songTitle}>{info.title}</Text>
    </View>
  );

}

function TrackProgress() {
  const { position, duration } = useProgress(200);

  function format(seconds) {
    let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // return (
  //   <View>
  //     <Text style={styles.trackProgress}>
  //       { format(position) } / { format(duration) }
  //     </Text>
  //   </View>
  // );

}

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if(event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
    }
  });

  function PlaylistItem({index, title, isCurrent, logoemisora}) {

    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        {/* <Text
          style={{...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#666' : 'transparent'}}}>
        {title}
        </Text> */}

      <Image
       style={{
         // tintColor: 'green',
         resizeMode: 'contain',
         height: 130,
         width: 130,
         backgroundColor: 'red',
         marginLeft:11,
         marginTop:11,
         ...
         {
          backgroundColor: isCurrent ? 'rgba(155,410,420,0.5)' : 'transparent'
         }
       }}
       source={{
         uri: logoemisora
         }}
     />



      </TouchableOpacity>
    );
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist()
  }

  return(
    <View>
      <View style={styles.playlist}>
        <FlatList
          horizontal={false}
          numColumns = {2}
          contentContainerStyle={{justifyContent:"center", alignItems:"center"}}
          data={queue}
          renderItem={({item, index}) => 
            <PlaylistItem
            index={index}
            title={item.title}
            logoemisora={item.artwork}
            isCurrent={currentTrack == index }
            />
          }
        />
      </View>
      

      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan' }}>
  <View style={{ flexDirection: 'row' }}>
    <NombreEmisora/>
    <Controls onShuffle={handleShuffle}/>
  </View>
</View>



    </View>

    
  );
}

function Controls({ onShuffle }) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if(await TrackPlayer.getState() == State.Playing) {
      TrackPlayer.pause();
    }
    else {
      TrackPlayer.play();
    }
  }

  return(
    <View style={{flexDirection: 'row',
      flexWrap: 'wrap', alignItems: 'center'}}>
        <Icon.Button
          name="arrow-left"
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToPrevious()}/>
        <Icon.Button
          name={playerState == State.Playing ? 'pause' : 'play'}
          size={28}
          backgroundColor="transparent"
          onPress={handlePlayPress}/>
        <Icon.Button
          name="arrow-right"
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToNext()}/>

        {/* <Icon.Button
          name="random"
          size={28}
          backgroundColor="transparent"
          onPress={onShuffle}/> */}

    </View>
  );
}

function App() {

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if(isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb"/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TrackProgress/>
      <Playlist/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'blue'
  },
  songTitle: {
    fontSize: 15,
    marginTop: 12,
    color: 'red',
    width:160,

  },
  artistName: {
    fontSize: 24,
    color: '#888'
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 26,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    backgroundColor:'red',
    height:120,
    width:120
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee'
  },
});

export default App;