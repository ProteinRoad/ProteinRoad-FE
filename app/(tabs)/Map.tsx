import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Modal, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaverMapView, Coord, NaverMapViewRef } from '@mj-studio/react-native-naver-map'
import * as Location from 'expo-location'
import { CustomMarker } from '@/components/map/CustomMarker';
import { CustomBottomSheet, CustomBottomSheetRef } from '@/components/map/CustomBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MapMarkerRenderer } from '@/components/render/MapMarkerRenderer';
import { SearchBar } from '../../components/map/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MarkerData {
  id: string;
  coordinate: Coord;
  title: string;
}

const DEFAULT_ZOOM = 13;
const DEFAULT_LOCATION: Coord = {
  latitude: 37.5407622,  // 건국대학교 학생회관
  longitude: 127.0783533,
};

const PERMISSION_AGREED_KEY = '@location_permission_agreed';

export default function Map() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
  const [currentLocation, setCurrentLocation] = useState<Coord>({
    latitude: 37.5666805,
    longitude: 126.9784147,
  });
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // 기기별 하단 여백 계산
  const bottomInset = Platform.select({
    ios: Math.max(20, insets.bottom),
    android: insets.bottom > 0 ? insets.bottom : 8,
    default: 0,
  });

  // 탭바 높이 계산 (app/(tabs)/_layout.tsx와 동일한 로직)
  const { height } = Platform.select({
    ios: { height: 812 }, // iPhone X 기준
    android: { height: 732 }, // 일반적인 Android 기준
    default: { height: 812 }
  });
  const scale = height / 375;
  const baseTabBarHeight = Math.max(50, Math.min(65, height * 0.1));
  const totalTabBarHeight = baseTabBarHeight + bottomInset;

  // 샘플 마커 데이터
  const markers: MarkerData[] = [
    // {
    //   id: '1',
    //   coordinate: DEFAULT_LOCATION,
    //   title: '건국대학교 학생회관',
    // },
    // {
    //   id: '2',
    //   coordinate: {
    //     latitude: 37.540236,  // 건대입구역 위도
    //     longitude: 127.070668,  // 건대입구역 경도
    //   },
    //   title: '건대입구역',
    // },
  ];

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      // 이전 동의 여부 확인
      const hasAgreedBefore = await AsyncStorage.getItem(PERMISSION_AGREED_KEY);
      
      // 위치 권한 상태 확인
      const { status } = await Location.getForegroundPermissionsAsync();
      
      if (status !== 'granted' && !hasAgreedBefore) {
        setShowPermissionModal(true);
      } else if (status === 'granted') {
        initializeLocation();
      }
    } catch (error) {
      console.error('Permission check error:', error);
    }
  };

  const handlePermissionAgree = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await AsyncStorage.setItem(PERMISSION_AGREED_KEY, 'true');
        setShowPermissionModal(false);
        initializeLocation();
      } else {
        Alert.alert(
          '위치 권한 필요',
          '위치 권한이 없으면 서비스 이용이 제한됩니다.',
          [{ text: '확인' }]
        );
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const handleOpenTerms = async () => {
    await WebBrowser.openBrowserAsync('https://rigorous-source-259.notion.site/15d2ed93891580488e1fc1979f869d08?pvs=4');
  };

  const handleOpenPrivacy = async () => {
    await WebBrowser.openBrowserAsync('https://rigorous-source-259.notion.site/15d2ed9389158092bbecdbfac0b39b97?pvs=4');
  };

  const initializeLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const newLocation: Coord = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(newLocation);
      animateToLocation(newLocation);
    } catch (e) {
      console.error('Location initialization failed:', e);
      animateToLocation(DEFAULT_LOCATION);
    }
  };

  useEffect(() => {
    const checkMapLoaded = setInterval(() => {
      if (mapRef.current) {
        setIsMapLoading(false);
        clearInterval(checkMapLoaded);
      }
    }, 100);

    return () => clearInterval(checkMapLoaded);
  }, []);

  // 카메라 이동 함수
  const animateToLocation = (coordinate: Coord, options?: { zoom?: number; duration?: number }) => {
    mapRef.current?.animateCameraTo({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      zoom: options?.zoom ?? currentZoom,
      duration: options?.duration ?? 500,
    });
  };

  // 마커 클릭 핸들러
  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    animateToLocation(marker.coordinate, { 
      zoom: 14,
      duration: 500,
    });
    bottomSheetRef.current?.snapToIndex(0);
  };

  const moveToDefaultLocation = () => {
    animateToLocation(DEFAULT_LOCATION, {
      zoom: 15,
      duration: 500,
    });
  };

  const handleSearchSelect = (latitude: number, longitude: number) => {
    animateToLocation({
      latitude,
      longitude,
    });
  };

  const renderMap = () => (
    <NaverMapView
      ref={mapRef as unknown as React.LegacyRef<NaverMapViewRef>}
      isShowLocationButton={hasLocationPermission}
      style={styles.map}
      initialCamera={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        zoom: DEFAULT_ZOOM,
      }}
      minZoom={3}
      maxZoom={16}
      onCameraChanged={e => setCurrentZoom(Math.round(e.zoom ?? DEFAULT_ZOOM))}
    >
      <MapMarkerRenderer
        markers={markers}
        onMarkerPress={handleMarkerPress}
        selectedMarkerId={selectedMarker?.id ?? null}
      />
    </NaverMapView>
  );

  const renderPermissionModal = () => (
    <Modal
      visible={showPermissionModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>위치기반 서비스 이용 동의</Text>
          <Text style={styles.modalText}>
            고단백은 주변 식당의 정보를 제공하기 위해 위치 정보가 필요합니다.{'\n\n'}
            위치 권한을 허용하시면 다음 사항에 동의하는 것으로 간주됩니다:{'\n'}
            • 이용약관{'\n'}
            • 개인정보처리방침{'\n'}
            • 위치기반 서비스 이용
          </Text>
          
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={handleOpenTerms}>
              <Text style={styles.link}>이용약관</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>|</Text>
            <TouchableOpacity onPress={handleOpenPrivacy}>
              <Text style={styles.link}>개인정보처리방침</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.agreeButton}
            onPress={handlePermissionAgree}
          >
            <Text style={styles.agreeButtonText}>동의하고 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <GestureHandlerRootView style={[styles.container, { paddingBottom: totalTabBarHeight }]}>
        {renderPermissionModal()}
        <TouchableOpacity 
          onPress={moveToDefaultLocation}
          style={styles.logoContainer}
        >
          <Image
            source={require('../../assets/images/Toplogo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <SearchBar onSelectRestaurant={handleSearchSelect} />

        {renderMap()}
      
        <View style={styles.zoomContainer}>
          <Text style={styles.zoomText}>Zoom: {currentZoom}x</Text>
        </View>
        <CustomBottomSheet
          ref={bottomSheetRef}
          selectedMarker={selectedMarker}
        />

        {isMapLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              지도를 불러오는 중. 오래 걸린다면 앱을 재시작해주세요
            </Text>
          </View>
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#91B52B',
  },
  logoContainer: {
    position: 'absolute',
    top : 10,
    alignSelf: 'center',
    zIndex: 1,
  },
  logo: {
    height: 36,
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  zoomContainer: {
    position: 'absolute',
    top: 14,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  zoomText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  defaultLocationButton: {
    backgroundColor: '#4A8B2C',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultLocationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Pretendard-Variable',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  link: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#4A8B2C',
    textDecorationLine: 'underline',
  },
  linkSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  agreeButton: {
    backgroundColor: '#4A8B2C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    textAlign: 'center',
  },
});