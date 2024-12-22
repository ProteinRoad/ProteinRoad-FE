import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MadeBy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>만든 사람들</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
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

      <View style={styles.footer}>
        {/* <Text style={styles.footerText}>이용약관</Text>
        <Text style={styles.footerText}>위치기반서비스 이용약관</Text>
        <Text style={styles.footerText}>개인정보처리방침</Text> */}
        <Text style={styles.copyright}>
          Copyright 2024, PROTEINROAD{'\n'}
          All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7ED',
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
    width: 28, // 좌우 균형을 맞추기 위한 더미 뷰
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 20,
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
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#999',
    textAlign: 'center',
  },
});
