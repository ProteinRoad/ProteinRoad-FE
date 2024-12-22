import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Switch, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

export const LocationPermissionToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setIsEnabled(status === 'granted');
  };

  const openAppSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else if (Platform.OS === 'android') {
        await Linking.openSettings();
      }
    } catch (error) {
      console.error('Failed to open app settings:', error);
      Alert.alert(
        '설정 열기 실패',
        '설정 앱을 열 수 없습니다. 직접 설정 앱에서 위치 권한을 변경해주세요.',
        [{ text: '확인' }]
      );
    }
  };

  const toggleLocationPermission = async () => {
    if (isEnabled) {
      Alert.alert(
        '위치 권한 설정',
        '위치 권한을 비활성화하려면 기기의 설정에서 변경해주세요.',
        [
          {
            text: '설정으로 이동',
            onPress: openAppSettings,
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ],
      );
    } else {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setIsEnabled(true);
          if (Platform.OS === 'android') {
            const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
            console.log('Background permission status:', backgroundStatus);
          }
        } else {
          Alert.alert(
            '위치 권한 필요',
            '앱에서 위치 기반 서비스를 사용하려면 위치 권한이 필요합니다.',
            [
              {
                text: '설정으로 이동',
                onPress: openAppSettings,
              },
              {
                text: '취소',
                style: 'cancel',
              },
            ],
          );
        }
      } catch (error) {
        console.error('Failed to request location permission:', error);
        Alert.alert(
          '권한 요청 실패',
          '위치 권한을 요청하는 중 오류가 발생했습니다.',
          [{ text: '확인' }]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.permissionItem}>
        <Text style={styles.permissionText}>위치 권한</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#4A8B2C' }}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLocationPermission}
          value={isEnabled}
        />
      </View>
      <Text style={styles.description}>
        {isEnabled 
          ? '위치 권한이 활성화되어 있습니다.'
          : '위치 기반 서비스를 사용하려면 위치 권한을 활성화해주세요.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333333',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666666',
    marginTop: 4,
  },
}); 