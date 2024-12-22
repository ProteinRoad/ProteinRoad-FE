import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { HomeBanner } from '@/components/home/HomeBanner';
import { HomeSection } from '@/components/home/HomeSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
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

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Pretendard': require('../../assets/fonts/Pretendard-Variable.ttf'),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    const proteinTipsItems = [
        { 
            title: '단백질을 쉽게 보충하는 법?', 
            href: 'protein-intake',
            imageUrl: require('../../assets/contents/content-resource13.png')
        },
        { 
            title: '식단 관리의 기본', 
            href: 'diet-basics', 
            imageUrl: require('../../assets/contents/content-resource15.png') 
        },
        { 
            title: '건강한 식습관 만들기', 
            href: 'healthy-habits',
            imageUrl: require('../../assets/contents/content-resource16.png')
        },
        { 
            title: '단백질 식품 추천', 
            href: 'protein-foods',
            imageUrl: require('../../assets/contents/content-resource11.png')
        },
    ];

    const popularMenuItems = [
        { 
            title: '닭가슴살 샐러드', 
            href: 'chicken-salad',
            imageUrl: require('../../assets/contents/content-resource9.png')
        },
        { 
            title: '연어 샌드위치', 
            href: 'salmon-sandwich',
            imageUrl: require('../../assets/contents/content-resource6.png')
        },
        { 
            title: '그릴드 치킨', 
            href: 'grilled-chicken',
            imageUrl: require('../../assets/contents/content-resource10.png')
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: totalTabBarHeight }}
            >
                <HomeBanner
                    title="포케? 그거 완전 건강식이지~"
                    subtitle="영양성분표에 숨은진실"
                    imageSource={require('../../assets/contents/content-resource4.png')}
                    contentId="nutrition-facts"
                />

                <View style={{ paddingTop: insets.top }}>
                    <HomeSection
                        title="단백질을 쉽게 보충하는 법?"
                        items={proteinTipsItems}
                        emoji="🥸"
                    />

                    <HomeSection
                        title="지금 인기있는 메뉴 보기"
                        items={popularMenuItems}
                        emoji="🔥"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7ED',
    },
    scrollView: {
        flex: 1,
    },
});
