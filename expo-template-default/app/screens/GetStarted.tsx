import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the types for the navigation stack
type RootStackParamList = {
  GetStarted: undefined;
  SignIn: undefined;
};

type GetStartedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetStarted'
>;

type GetStartedProps = {
  navigation: GetStartedScreenNavigationProp;
};

export default function GetStarted({ navigation }: GetStartedProps) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Update this with your actual background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')} // Update this with your actual logo image path
          style={styles.logo}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')} // Navigate to SignIn screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff69b4', // A pinkish color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
