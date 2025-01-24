import { useState, useRef, useCallback, useEffect } from 'react';
import Sound from 'react-native-sound';

interface UseAudioPlayerResult {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  play: (uri: string | number) => void;
  pause: () => void;
  stop: () => void;
  error: string | null;
}

export default function useAudioPlayer(): UseAudioPlayerResult {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (soundRef.current && isPlaying) {
      interval = setInterval(() => {
        soundRef.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return () => {if(interval) clearInterval(interval)}; // added this line to prevent memory leaks
  }, [isPlaying]);

  const handleSoundLoad = (sound: Sound, error: Sound.SoundError | null) => {
    if (error) {
      console.error('Failed to load the sound', error);
      setError(error.message || "Failed to load sound");
      return;
    }

    setDuration(sound.getDuration());
    soundRef.current = sound;
    sound.play((success) => {
      if (!success) {
        console.error('Playback failed due to audio decoding errors');
        setError('Playback failed.');
      } else {
        setIsPlaying(true);
      }
    });
  };

  const play = useCallback((uri: string | number) => {
    setError(null);

    if (!uri) {
      console.error("Audio URI is invalid or empty.");
      setError("Invalid audio source.");
      return;
    }

    if (soundRef.current) {
      soundRef.current.release();
      soundRef.current = null;
    }

    try {
      if (typeof uri === 'number') {
        soundRef.current = new Sound(uri, undefined, (error) => {
            handleSoundLoad(soundRef.current!, error);
        });
      } else if (typeof uri === 'string') {
        soundRef.current = new Sound(uri, undefined, (error) => {
            handleSoundLoad(soundRef.current!, error);
        });
      } else {
        console.error("Invalid URI type. Must be string or number (require).");
        setError("Invalid audio source type.");
        return;
      }
    } catch (error: any) {
      console.error("Error creating Sound instance", error);
      setError("Error creating sound instance: " + error.message);
      return;
    }
  }, []);

  const pause = useCallback(() => {
    if (soundRef.current && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  return {
    isPlaying,
    duration,
    currentTime,
    play,
    pause,
    stop,
    error,
  };
}

export default useAudioPlayer;