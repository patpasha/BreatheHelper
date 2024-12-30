import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BreathingCircle from '../components/BreathingCircle';

const HomeScreen = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    let timer;
    if (isBreathing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreathing(false);
      setTimeLeft(180);
    }
    return () => clearInterval(timer);
  }, [isBreathing, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={['#1E88E5', '#1565C0', '#0D47A1']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Breathe Helper</Text>
          <Text style={styles.subText}>Take a moment to relax</Text>
        </View>

        <View style={styles.mainContent}>
          <BreathingCircle isBreathing={isBreathing} />
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <Text style={styles.instruction}>
            {isBreathing ? 'Breathe in... Breathe out...' : 'Ready to start?'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsBreathing(!isBreathing)}
        >
          <Text style={styles.buttonText}>
            {isBreathing ? 'Stop' : 'Start Breathing'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 30,
  },
  instruction: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
