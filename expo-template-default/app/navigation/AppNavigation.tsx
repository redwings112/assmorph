import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import GetStarted from './src/screens/GetStartedScreen';
import SignIn from './src/screens/SignInScreen';
import SignUp from './src/screens/SignupScreen';
import Home from './src/screens/Home';
import PlaylistScreen from './src/screens/PlaylistScreen'; // New Playlist Screen
import ContactUsScreen from './src/screens/ContactUsScreen'; // New Contact Us Screen
import MusicPlayerScreen from './src/screens/MusicPlayerScreen'; // New Music Player Screen
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming using Ionicons for icons

const Stack = createStackNavigator();

export default function AppNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{ headerShown: false }}  // Hide header for all screens
      >
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        
        {/* New Screens */}
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
