import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Define types for the hook return values
interface UseAuthResult {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
}

export default function useAuth(): UseAuthResult {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const auth = getAuth();

  // Sign up function
  const signUp = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(''); // Clear any errors
    } catch (error: any) {
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

  // Sign in function
  const signIn = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Clear any errors
    } catch (error: any) {
      const firebaseErrors: Record<string, string> = {
        'auth/user-not-found': 'No user found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-email': 'Invalid email address',
      };
      setError(firebaseErrors[error.code] || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    setError,
    setLoading,
    signUp,
    signIn,
  };
}
