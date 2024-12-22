import React, { useRef, useImperativeHandle, forwardRef, useMemo, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useProteinStore } from '@/store/useProteinStore';
import { CustomMenu } from './CustomMenu';
import { CustomMenuNotfound } from './CustomMenuNotfound';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

enum BottomSheetState {
  CLOSED = -1,
  PARTIAL = 0,
  FULL = 1,
}

interface HintConfig {
  text: string;
  show: boolean;
}

interface MarkerData {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
}

export interface CustomBottomSheetRef {
  snapToIndex: (index: number) => void;
  getCurrentState: () => BottomSheetState;
}

interface CustomBottomSheetProps {
  selectedMarker: MarkerData | null;
}

export const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(
  ({ selectedMarker }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const translateY = useRef(new Animated.Value(0)).current;
    const [sheetState, setSheetState] = useState<BottomSheetState>(BottomSheetState.CLOSED);
    const insets = useSafeAreaInsets();
    
    // 기기별 하단 여백 계산
    const bottomInset = Platform.select({
      ios: Math.max(20, insets.bottom),
      android: insets.bottom > 0 ? insets.bottom : 8,
      default: 0,
    });

    // 탭바 높이 계산
    const { height } = Platform.select({
      ios: { height: 812 },
      android: { height: 732 },
      default: { height: 812 }
    });
    const scale = height / 375;
    const baseTabBarHeight = Math.max(50, Math.min(65, height * 0.1));
    const totalTabBarHeight = baseTabBarHeight + bottomInset;

    const snapPoints = useMemo(() => ['40%', '80%'], []);
    const { menus, nutritionRequests, increaseInterestCount } = useProteinStore();
    const [showPolicyModal, setShowPolicyModal] = useState(false);

    // 선택된 식당의 메뉴들 필터링
    const restaurantMenus = useMemo(() => {
      if (!selectedMarker) return [];
      return menus.filter(menu => menu.restaurant_id === selectedMarker.id);
    }, [selectedMarker, menus]);

    const currentRequest = useMemo(() => {
      if (!selectedMarker) return null;
      return nutritionRequests.find(
        request => request.restaurant_id === selectedMarker.id
      );
    }, [selectedMarker, nutritionRequests]);

    // 힌트 설정 관리
    const getHintConfig = useCallback((): HintConfig => {
      if (!selectedMarker) {
        return { text: '', show: false };
      }

      switch (sheetState) {
        case BottomSheetState.CLOSED:
          return { text: '핀을 눌러보세요', show: true };
        case BottomSheetState.PARTIAL:
          return { text: '위로 스와이프하여 더 보기', show: true };
        case BottomSheetState.FULL:
          return { text: '', show: false };
        default:
          return { text: '', show: false };
      }
    }, [selectedMarker, sheetState]);

    // 애니메이션 시작 함수
    const startHintAnimation = useCallback(() => {
      translateY.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [translateY]);

    // 애니메이션 초기화 함수
    const resetHintAnimation = useCallback(() => {
      translateY.setValue(0);
    }, [translateY]);

    // 힌트 애니메이션 관리
    useEffect(() => {
      const hintConfig = getHintConfig();
      if (hintConfig.show) {
        startHintAnimation();
      } else {
        resetHintAnimation();
      }
    }, [sheetState, selectedMarker, startHintAnimation, resetHintAnimation, getHintConfig]);

    // 바텀시트 상태 변경 핸들러
    const handleSheetChanges = useCallback((index: number) => {
      setSheetState(index as BottomSheetState);
    }, []);

    // ref를 통해 외부에서 접근 가능한 메서드들
    useImperativeHandle(ref, () => ({
      snapToIndex: (index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
      },
      getCurrentState: () => sheetState,
    }));

    // 힌트 텍스트 렌더링
    const renderHintText = () => {
      const hintConfig = getHintConfig();
      if (!hintConfig.show) return null;

      return (
        <Animated.View 
          style={[
            styles.hintContainer,
            { transform: [{ translateY }] }
          ]}
        >
          <Text style={styles.hint}>{hintConfig.text}</Text>
        </Animated.View>
      );
    };

    const handleInterestPress = useCallback(() => {
      if (selectedMarker) {
        const success = increaseInterestCount(selectedMarker.id);
        if (!success) {
          // 이미 관심 표시한 경우 처리
          console.log('이미 관심 표시한 식당입니다.');
        }
      }
    }, [selectedMarker, increaseInterestCount]);

    const renderMenuPolicy = () => (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPolicyModal}
        onRequestClose={() => setShowPolicyModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPolicyModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>메뉴 정보 안내</Text>
            <Text style={styles.modalText}>
              • 메뉴의 영양정보는 두 가지 방법으로 제공됩니다.{'\n\n'}
              1. 국가영양정보데이터베이스 참고.{'\n'}
              2. 성분분석 전문기관 - 10명이상 관심이 모인 경우 분석을 의뢰합니다.{'\n\n'}
              • 분석된 정보는 조리방법 등에 따라 실제 제공되는 메뉴와 오차가 있을 수 있습니다.{'\n\n'}
              • 메뉴 정보는 주기적으로 업데이트되며, 가장 최신 정보를 제공하기 위해 노력하고 있습니다.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowPolicyModal(false)}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );

    return (
      <>
        {renderHintText()}
        {renderMenuPolicy()}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          index={-1}
          onChange={handleSheetChanges}
          bottomInset={Platform.OS === 'android' ? 0 : totalTabBarHeight}
          style={{ flex: 1 }}
        >
          <Text style={styles.restaurantName}>{selectedMarker?.title}</Text>
          <View style={styles.divider} />
          
          <BottomSheetScrollView
            style={styles.container}
            contentContainerStyle={[
              styles.contentContainer,
              { 
                paddingBottom: Platform.OS === 'android' 
                  ? 80  // 40에서 80으로 증가
                  : totalTabBarHeight 
              }
            ]}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.contentname}>메뉴 정보</Text>
              <TouchableOpacity
                onPress={() => setShowPolicyModal(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="information-circle-outline" size={16} color="#aaaaaa" />
              </TouchableOpacity>
            </View>
            {selectedMarker && (
              <>
                {restaurantMenus.map(menu => (
                  <CustomMenu
                    key={menu.menu_id}
                    menu_name={menu.menu_name}
                    price={menu.price}
                    calories={menu.calories}
                    protein={menu.protein}
                    image_url={menu.image_url}
                  />
                ))}
                {currentRequest && (
                  <CustomMenuNotfound
                    interest_count={currentRequest.interest_count}
                    onInterestPress={handleInterestPress}
                    restaurant_id={currentRequest.restaurant_id}
                    restaurant_name={selectedMarker?.title || ''}
                    request_status={currentRequest.request_status}
                  />
                )}
              </>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: 16,
    fontFamily: 'Pretendard-Variable',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  contentname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 18,
    fontFamily: 'Pretendard-Variable',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    elevation: 5,
    pointerEvents: 'none',
  },
  hint: {
    fontSize: 12,
    color: '#4A8B2C',
    fontFamily: 'Pretendard-Variable',
    fontWeight: '800',
    backgroundColor: 'rgba(244, 247, 237, 0.95)',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 6,
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
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    fontFamily: 'Pretendard-Variable',
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    fontFamily: 'Pretendard-Variable',
  },
  modalButton: {
    backgroundColor: '#4A8B2C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Variable',
  },
}); 