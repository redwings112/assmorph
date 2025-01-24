import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Profile(): JSX.Element {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/profile-image.jpg')} style={styles.profileImage} />
      <Text style={styles.title}>Profile Page</Text>
      <Text style={styles.description}>This is the profile page.</Text>
      
      <TouchableOpacity style={styles.addMusicButton}>
        <Text style={styles.addMusicText}>Add Music</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f02a7f', // Pink color for title
  },
  description: {
    fontSize: 16,
    color: '#000', // Black text for description
    textAlign: 'center',
    marginTop: 10,
  },
  addMusicButton: {
    backgroundColor: '#f02a7f', // Pink button for adding music
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  addMusicText: {
    color: '#fff', // White text on button
    fontSize: 16,
  },
});
