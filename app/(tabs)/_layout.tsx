import { Tabs } from "expo-router";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // 375는 기준 디바이스 width
const baseTabBarHeight = Math.max(50, Math.min(65, height * 0.1)); // 최소 50, 최대 65
const fontSize = Math.max(10, Math.min(12, scale * 12)); // 최소 10, 최대 12

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  // 기기별 하단 여백 계산
  const bottomInset = Platform.select({
    ios: Math.max(20, insets.bottom), // iOS의 경우 최소 20의 여백
    android: insets.bottom > 0 ? insets.bottom : 8, // Android의 경우 Safe Area가 있으면 적용, 없으면 8
    default: 0,
  });

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#4A8B2C',
      tabBarInactiveTintColor: '#999999',
      tabBarStyle: {
        height: baseTabBarHeight + bottomInset,
        paddingTop: Math.max(4, scale * 4),
        paddingBottom: Math.max(6, scale * 6) + bottomInset,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8EBE1',
        position: 'absolute',
        elevation: 0,
        shadowOpacity: 0,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarLabelStyle: {
            fontSize: fontSize,
            fontFamily: 'Pretendard-Variable',
            fontWeight: '400',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              color={color} 
              scale={scale}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: '지도',
          tabBarLabelStyle: {
            fontSize: fontSize,
            fontFamily: 'Pretendard-Variable',
            fontWeight: '400',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'map' : 'map-outline'} 
              color={color} 
              scale={scale}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          title: '더보기',
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: fontSize,
            fontFamily: 'Pretendard-Variable',
            fontWeight: '400',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'} 
              color={color} 
              scale={scale}
            />
          ),
        }}
      />
    </Tabs>
  );
}