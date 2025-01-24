import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import validator from 'validator'; // Added validation library

export default function SignInScreen(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  // Handle SignIn
  const handleSignIn = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const auth = getAuth();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Clear errors on success
      navigation.navigate('Home'); // Navigate to Home screen after sign-in
    } catch (error: any) {
      const firebaseErrors: Record<string, string> = {
        'auth/invalid-email': 'Invalid email address',
        'auth/user-not-found': 'No user found with this email',
        'auth/wrong-password': 'Incorrect password',
      };
      setError(firebaseErrors[error.code] || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image source={require('../assets/1000068604.png')} style={styles.headerImage} accessible accessibilityLabel="App logo" />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        accessible
        accessibilityLabel="Enter your email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        accessible
        accessibilityLabel="Enter your password"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading Spinner */}
      {loading && <ActivityIndicator size="large" color="#FF0080" />}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Navigation to Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF0080',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  switchText: {
    marginTop: 20,
    color: '#007BFF',
  },
});
