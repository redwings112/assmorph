import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useNavigation, NavigationProp } from '@react-navigation/native'; // For navigation

// Define the navigation type
type RootStackParamList = {
  Home: undefined;
  HomeScreen: undefined;
  ContactScreen: undefined;
  Playlist: undefined;
};

export default function NavBar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navBar}>
      {/* Home Icon */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('./screens/Home')}
      >
        <FontAwesome name="home" size={24} color="#f02a7f" />
      </TouchableOpacity>

      {/* Music Player Icon */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('./components/MusicPlayer')}
      >
        <FontAwesome name="music" size={24} color="#f02a7f" />
      </TouchableOpacity>

      {/* Contact Us Icon */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('./screens/Contact')}
      >
        <FontAwesome name="envelope" size={24} color="#f02a7f" />
      </TouchableOpacity>

      {/* Playlist Icon */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('../components/Playlist')}
      >
        <FontAwesome name="list" size={24} color="#f02a7f" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
