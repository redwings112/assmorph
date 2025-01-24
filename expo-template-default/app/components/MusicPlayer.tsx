import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import useAudioPlayer from '../hooks/useAudioPlayer'; // Import custom hook

export default function MusicPlayer(): JSX.Element {
  const { isPlaying, duration, currentTime, play, pause, stop } = useAudioPlayer();

  const audioUri = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Example audio URI

  useEffect(() => {
    // Automatically start playing audio when the screen mounts
    play(audioUri);
    return () => {
      stop(); // Stop audio on unmount
    };
  }, [play, stop]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>

      {/* Displaying current playback time and duration */}
      <Text style={styles.info}>
        {Math.floor(currentTime)} / {Math.floor(duration)} seconds
      </Text>

      {/* Play/Pause Button */}
      <TouchableOpacity onPress={() => (isPlaying ? pause() : play(audioUri))} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>

      {/* Stop Button */}
      <TouchableOpacity onPress={stop} style={styles.button}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {isPlaying && <ActivityIndicator size="large" color="#FF0080" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FF0080',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


