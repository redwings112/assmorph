import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

// Define types for navigation prop
type SignUpNavigationProp = {
  navigate: (screen: string) => void;
};

export default function SignUpScreen(): JSX.Element {
  const [email, setEmail] = useState<string>(''); // Email state
  const [password, setPassword] = useState<string>(''); // Password state
  const [error, setError] = useState<string>(''); // Error state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const navigation = useNavigation<SignUpNavigationProp>(); // Typing the navigation prop

  // Handle SignUp function
  const handleSignUp = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Email validation regex
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const auth = getAuth();
    setLoading(true);
    try {
      // Firebase authentication to create user
      await createUserWithEmailAndPassword(auth, email, password);
      setError(''); // Clear error on success
      navigation.navigate('Home'); // Navigate to Home screen after successful sign-up
    } catch (error: any) {
      // Firebase error handling
      const firebaseErrors: Record<string, string> = {
        'auth/email-already-in-use': 'Email is already in use',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Weak password, please use a stronger password',
      };
      setError(firebaseErrors[error.code] || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require('../assets/1000068604.png')}
        style={styles.headerImage}
        accessible
        accessibilityLabel="App logo"
      />

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

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation to Sign In */}
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.switchText}>Already have an account? Sign In</Text>
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
