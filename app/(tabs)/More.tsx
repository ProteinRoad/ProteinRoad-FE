import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import { Link, Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationPermissionToggle } from '@/components/settings/LocationPermissionToggle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

const More = () => {
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const insets = useSafeAreaInsets();

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

  const menuItems: Array<{
    id: number;
    title?: string;
    href?: Href<string | object>;
    isSpacing?: boolean;
  }> = [
    { id: 1, title: '만든 사람들', href: '/(screens)/made-by' as Href<string> },
    { id: 2, title: '앱 권한 설정' },
    { id: 3, title: '오픈소스 라이선스', href: '/(screens)/licence' as Href<string> },
    { id: 4, isSpacing: true },
    { 
      id: 5, 
      title: '문의하기', 
      href: {
        pathname: '/(screens)/contact',
        params: { category: '일반문의' }
      } as Href<string | object>
    },
    { 
      id: 6, 
      title: '음식점 제보하기',
      href: {
        pathname: '/(screens)/contact',
        params: { category: '음식점 제보하기' }
      } as Href<string | object>
    },
    { 
      id: 7, 
      title: '업체 등록 요청 / 정보 수정',
      href: {
        pathname: '/(screens)/contact',
        params: { category: '업체문의' }
      } as Href<string | object>
    },
  ];

  const handleOpenLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollViewContent, { paddingBottom: totalTabBarHeight }]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('../../assets/images/logo_up.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>고단백</Text>
            <Text style={styles.description}>
              단백질 섭취에 관심 있는 모든 분들을 위해 탄생했습니다.{'\n'}
              주변의 건강한 식당 정보를 손쉽게 확인하면서{'\n'}
              더욱 많은 사람이 균형 잡힌 식사에{'\n'}
              한 층 더 관심을 가질 수 있도록 기여하겠습니다.{'\n'}
              건강한 외식 문화가 자리 잡는 날을 꿈꾸고 있습니다.
            </Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map(item => {
              if (item.isSpacing) {
                return <View key={item.id} style={styles.menuSpacing} />;
              }

              if (item.title === '앱 권한 설정') {
                return (
                  <View key={item.id}>
                    <TouchableOpacity 
                      style={styles.menuItem}
                      onPress={() => setShowLocationPermission(!showLocationPermission)}
                    >
                      <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                    {showLocationPermission && <LocationPermissionToggle />}
                  </View>
                );
              }
              
              return item.href ? (
                <Link key={item.id} href={item.href} asChild>
                  <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>{item.title}</Text>
                  </TouchableOpacity>
                </Link>
              ) : (
                <TouchableOpacity key={item.id} style={styles.menuItem}>
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Text style={styles.version}>앱 버전 1.0.0</Text>
            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => handleOpenLink('https://rigorous-source-259.notion.site/15d2ed93891580488e1fc1979f869d08?pvs=4')}
                style={styles.linkButton}
              >
                <Text style={styles.linkText}>이용약관</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOpenLink('https://rigorous-source-259.notion.site/15d2ed9389158092bbecdbfac0b39b97?pvs=4')}
                style={styles.linkButton}
              >
                <Text style={styles.linkText}>개인정보처리방침</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.copyright}>
              Copyright 2024, PROTEINROAD{'\n'}
              All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    marginBottom: 15,
    color: '#4A8B2C',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '500',
    color: '#333',
  },
  footer: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  version: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#999',
    marginBottom: 10,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#666',
    marginHorizontal: 5,
    marginVertical: 2,
  },
  copyright: {
    fontSize: 12,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#999',
    textAlign: 'center',
  },
  menuSpacing: {
    height: 20,
  },
  linkButton: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
});

export default More;
