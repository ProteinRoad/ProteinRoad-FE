import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LicencePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const licenseContent = `
| Core Libraries:
- React (v18.2.0) - MIT License
- React Native (v0.74.5) - MIT License
- Expo (v51.0.39) - MIT License

| UI Components:
- @gorhom/bottom-sheet (v4.6.4) - MIT License
- react-native-gesture-handler (v2.16.2) - MIT License
- react-native-reanimated (v3.10.1) - MIT License
- react-native-safe-area-context (v4.10.5) - MIT License
- react-native-screens (v3.31.1) - MIT License
- @expo/vector-icons (v14.0.4) - MIT License
- expo-blur (v13.0.2) - MIT License
- lottie-react-native (v6.7.0) - MIT License

| Navigation:
- expo-router (v3.5.24) - MIT License
- @react-navigation/native (v6.1.18) - MIT License

| State Management:
- zustand (v5.0.2) - MIT License

| Data & Storage:
- axios (v1.7.9) - MIT License
- expo-sqlite (v14.0.6) - MIT License
- expo-file-system (v17.0.1) - MIT License

| Maps:
- @mj-studio/react-native-naver-map (v1.5.10) - MIT License

| Development Tools:
- typescript (v5.3.3) - Apache-2.0 License
- @babel/core (v7.25.8) - MIT License
- jest (v29.7.0) - MIT License

| 기타 Expo 모듈들:
- expo-constants (v16.0.2) - MIT License
- expo-status-bar (v1.12.1) - MIT License
- expo-linking (v6.3.1) - MIT License
- expo-location (v17.0.1) - MIT License
- expo-mail-composer (v13.0.1) - MIT License
- expo-web-browser (v13.0.3) - MIT License

MIT License

MIT 라이선스의 주요 내용:
- 소프트웨어를 제한 없이 다룰 수 있습니다.
- 이 소프트웨어를 누구라도 무상으로 제한 없이 취급할 수 있습니다.
- 저작권 표시와 이 허가 표시를 소프트웨어의 모든 복제물 또는 중요한 부분에 기재해야 합니다.
- 소프트웨어는 "있는 그대로" 제공되며, 저자 또는 저작권자는 소프트웨어에 관해 아무런 책임도 지지 않습니다.

Apache License 2.0

Apache 라이선스 2.0의 주요 내용:
- 이 소프트웨어를 사용, 수정, 배포할 권리를 무상으로 부여합니다.
- 수정된 버전을 배포할 때는 정확한 수정 사항을 명시해야 합니다.
- 저작권 표시, 특허, 상표, 보증 부인 등을 포함한 라이선스 사본을 배포 시 함께 제공해야 합니다.
- 기여자가 보유한 특허의 라이선스를 함께 부여합니다.`;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>오픈소스 라이선스</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={styles.title}>오픈소스 라이선스</Text>
          <Text style={styles.description}>
            본 애플리케이션은 다음과 같은 오픈소스 소프트웨어를 사용하고 있습니다.
          </Text>
          <Text style={styles.content}>{licenseContent}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBE1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 28,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8EBE1',
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
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    lineHeight: 22,
    color: '#333',
  },
}); 