import React, { useState, useEffect, useMemo } from 'react';  
import {  
  View,  
  Text,  
  TouchableOpacity,  
  StyleSheet,  
  ScrollView,  
  ActivityIndicator,  
  Animated,  
  Dimensions,  
  Image,  
} from 'react-native';  
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';  
import TopBar from '../components/Topbar';  
import NavBar from '../components/Navbar';  
import activationButtonImage from '../screens/activationButtonImage';  

export default function BodyContent(): JSX.Element {  
  const [counter, setCounter] = useState<number>(0);  
  const [clickCount, setClickCount] = useState<number>(0);  
  const [showVideo, setShowVideo] = useState<boolean>(false);  
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);  
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));  
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);  

  // Get screen width for video size calculations  
  const screenWidth = Dimensions.get('window').width;  
  const videoSize = {  
    width: screenWidth * 0.8,  
    height: (screenWidth * 0.8) * (9 / 16), // Maintain 16:9 aspect ratio  
  };  

  useEffect(() => {  
    let interval: ReturnType<typeof setInterval> | null = null;  

    if (showVideo && counter < 3) {  
      interval = setInterval(() => {  
        setCounter((prevCounter) => {  
          if (prevCounter < 3) {  
            return prevCounter + 1;  
          } else {  
            clearInterval(interval!);  
            return 3;  
          }  
        });  
      }, 1000);  
    }  

    return () => {  
      if (interval) {  
        clearInterval(interval);  
      }  
    };  
  }, [showVideo]);  

  const handleVideoClick = () => {  
    setClickCount((prevCount) => (prevCount + 1) % 3);  
  };  

  const getVideoSource = (): any => {  
    switch (clickCount) {  
      case 0:  
        return require('../assets/2ndtwerk.mp4');  
      case 1:  
        return require('../assets/1sttwerk.mp4');  
      case 2:  
        return require('../assets/3rdtwerk.mp4');  
      default:  
        return require('../assets/2ndtwerk.mp4');  
    }  
  };  

  const videoSource = useMemo(() => getVideoSource(), [clickCount]);  

  const handleActivationButtonClick = () => {  
    setShowVideo(true);  
    setCounter(0);  
    setIsVideoReady(false);  
    Animated.timing(fadeAnim, {  
      toValue: 1,  
      duration: 1000,  
      useNativeDriver: true,  
    }).start();  
  };  

  return (  
    <View style={styles.bodyContainer}>  
      <TopBar />  
      <ScrollView contentContainerStyle={styles.contentContainer}>  
        {!showVideo ? (  
          <TouchableOpacity  
            onPress={handleActivationButtonClick}  
            accessible={true}  
            accessibilityLabel="Activate video"  
            accessibilityHint="Starts the countdown and shows the video"  
          >  
            <Image  
              source={activationButtonImage}  
              style={styles.activationButtonImage}  
              resizeMode="contain"  
            />  
          </TouchableOpacity>  
        ) : (  
          <Animated.View style={{ opacity: fadeAnim }}>  
            {counter < 3 ? (  
              <Text style={styles.counter}>{counter}</Text>  
            ) : (  
              <TouchableOpacity  
                onPress={handleVideoClick}  
                style={styles.videoContainer}  
                accessible={true}  
                accessibilityLabel="Play next video"  
                accessibilityHint="Cycles through available videos"  
              >  
                {!isVideoReady && (  
                  <ActivityIndicator size="large" color="#FFA500" />  
                )}  
                <Video  
                  source={videoSource}  
                  style={[  
                    { backgroundColor: '#000' },  
                    videoSize,  
                  ]}  
                  resizeMode={ResizeMode.CONTAIN}  
                  isLooping  
                  onLoad={() => setIsVideoReady(true)}  
                  onError={(error) => console.error('Video Error:', error)}  
                  onPlaybackStatusUpdate={(status: AVPlaybackStatus) =>  
                    setVideoStatus(status)  
                  }  
                />  
                {videoStatus?.isLoaded === false && (  
                  <Text style={styles.errorText}>Error loading video</Text>  
                )}  
              </TouchableOpacity>  
            )}  
          </Animated.View>  
        )}  
      </ScrollView>  
      <NavBar />  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  bodyContainer: {  
    flex: 1,  
    backgroundColor: '#1E1E2C',  
  },  
  contentContainer: {  
    flexGrow: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    padding: 20,  
  },  
  counter: {  
    fontSize: 100,  
    color: '#FFA500',  
    fontWeight: 'bold',  
  },  
  videoContainer: {  
    justifyContent: 'center',  
    alignItems: 'center',  
    marginVertical: 20,  
  },  
  activationButtonImage: {  
    width: 200,  
    height: 100,  
    marginTop: 20,  
  },  
  errorText: {  
    color: '#FF0000',  
    marginTop: 10,  
  },  
});  
