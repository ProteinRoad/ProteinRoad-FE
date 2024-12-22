import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { useProteinStore } from '@/store/useProteinStore';
import handleInterestClick from '@/components/AxiosHandler/InterestedButtonClicked';
import * as Location from 'expo-location';

interface CustomMenuNotfoundProps {
  interest_count: number;
  onInterestPress?: () => void;
  restaurant_id: string;
  restaurant_name: string;
  request_status: string;
}

export const CustomMenuNotfound: React.FC<CustomMenuNotfoundProps> = ({
  interest_count,
  onInterestPress,
  restaurant_id,
  restaurant_name,
  request_status
}) => {
  const { interestedRestaurants } = useProteinStore();
  const isInterested = interestedRestaurants.has(restaurant_id);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<LottieView>(null);

  const getInterestCountColor = (count: number) => {
    if (count >= 10) return '#2196F3';
    if (count >= 8) return '#4A8B2C';
    if (count >= 5) return '#4CAF50';
    return '#666666';
  };

  const handleInterestPress = async () => {
    try {
      // 현재 위치 가져오기
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      // 관심 데이터 서버로 전송
      const success = await handleInterestClick(
        locationData,
        restaurant_id,
        restaurant_name
      );

      if (success) {
        if (interest_count === 9) {
          setShowConfetti(true);
          confettiRef.current?.play();
        }
        // 기존의 onInterestPress 콜백 실행
        onInterestPress?.();
      }
    } catch (error) {
      console.error('Error in handleInterestPress:', error);
    }
  };

  const isAnalyzing = request_status === '의뢰신청중';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>정확한 영양성분을 위해 힘을 모아주세요. 🔥</Text>

      <LottieView
        source={require('../../assets/lotties/hands.json')}
        autoPlay={true}
        loop={true}
        style={styles.icon}
      />

      <View style={styles.interestRow}>
        <Text style={styles.interestText}>지금까지</Text>
        <Text style={[
          styles.interestCount,
          { color: getInterestCountColor(interest_count) }
        ]}>{interest_count}</Text>
        <Text style={styles.interestText}>명이 궁금해했어요.</Text>
      </View>

      {isAnalyzing ? (
        <>
          <View style={styles.analyzingContainer}>
            <LottieView
              source={require('../../assets/lotties/loading.json')}
              autoPlay={true}
              loop={true}
              style={styles.loadingIcon}
            />
            <Text style={styles.analyzingTitle}>조금만 기다려 주세요</Text>
            <Text style={styles.analyzingDescription}>
              전문기관에서 영양성분을 분석하고 있습니다.{'\n'}
              곧 업데이트 해드릴게요!
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.description}>10명 이상이 모이면,</Text>
          <Text style={styles.description}>
            저희가 사장님과 힘을 합쳐
          </Text>
          <Text style={styles.description}>
            영양정보를 전문기관에 의뢰해 분석해볼게요.
          </Text>

          <TouchableOpacity 
            style={[styles.button, isInterested && styles.buttonPressed]}
            onPress={handleInterestPress}
            disabled={isInterested}
          >
            <Text style={[styles.buttonText, isInterested && styles.buttonTextPressed]}>
              {isInterested ? '곧 알려드릴게요! 🥸' : '궁금해요 🔍'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {showConfetti && (
        <LottieView
          ref={confettiRef}
          source={require('../../assets/lotties/confeti.json')}
          style={styles.confetti}
          autoPlay
          loop={false}
          onAnimationFinish={() => setShowConfetti(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7ED',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: Platform.OS === 'android' ? 32 : 16,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  confetti: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonPressed: {
    backgroundColor: '#F4F7ED',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#4A8B2C',
  },
  buttonTextPressed: {
    color: '#8B4513',
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  interestCount: {
    fontSize: 24,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    marginVertical: 4,
    alignItems: 'baseline',
    paddingLeft: 8,
    paddingRight: 4,
  },
  interestText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
    alignItems: 'baseline',
  },
  analyzingContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  loadingIcon: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  analyzingTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  analyzingDescription: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#424242',
    textAlign: 'center',
    lineHeight: 20,
  },
});
