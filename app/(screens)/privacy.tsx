import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Privacy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개인정보처리방침</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 콘텐츠 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.title}>고단백 개인정보처리방침</Text>
          
          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>1. 개인정보의 처리 목적</Text>
            <Text style={styles.articleText}>
              프로틴로드(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
            </Text>
            <Text style={styles.listItem}>• 위치 기반 서비스 제공</Text>
            <Text style={styles.listItem}>• 맞춤형 식당 정보 제공</Text>
            <Text style={styles.listItem}>• 서비스 이용 통계 분석</Text>
          </View>

          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>2. 수집하는 개인정보 항목</Text>
            <Text style={styles.articleText}>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</Text>
            <Text style={styles.subTitle}>필수항목</Text>
            <Text style={styles.listItem}>• 위치정보 (현재 위치)</Text>
            <Text style={styles.listItem}>• 기기 식별 정보</Text>
            <Text style={styles.subTitle}>선택항목</Text>
            <Text style={styles.listItem}>• 백그라운드 위치정보</Text>
          </View>

          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>3. 개인정보의 보유 및 이용기간</Text>
            <Text style={styles.articleText}>
              회사는 서비스를 제공하는 기간 동안에 한하여 최소한의 개인정보를 보유 및 이용하며, 개인정보의 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </Text>
          </View>

          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>4. 개인정보의 파기절차 및 방법</Text>
            <Text style={styles.articleText}>
              원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
            </Text>
            <Text style={styles.listItem}>• 파기절차: 불필요한 개인정보는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 파기</Text>
            <Text style={styles.listItem}>• 파기방법: 전자적 파일 형태의 정보는 기술적 방법을 사용하여 삭제</Text>
          </View>

          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>5. 이용자의 권리와 그 행사방법</Text>
            <Text style={styles.articleText}>
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </Text>
            <Text style={styles.listItem}>• 개인정보 열람요구</Text>
            <Text style={styles.listItem}>• 오류 등이 있을 경우 정정 요구</Text>
            <Text style={styles.listItem}>• 삭제요구</Text>
            <Text style={styles.listItem}>• 처리정지 요구</Text>
          </View>

          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>6. 개인정보 보호책임자</Text>
            <Text style={styles.articleText}>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </Text>
            <Text style={styles.listItem}>• 개인정보 보호책임자</Text>
            <Text style={styles.listItem}>• 성명 : 윤민욱</Text>
            <Text style={styles.listItem}>• 이메일: fast1597@gmail.com</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>본 개인정보처리방침은 2024년 12월 1일부터 시행됩니다.</Text>
            <Text style={styles.companyInfo}>팀 프로틴로드</Text>
          </View>
        </View>
      </ScrollView>
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
    width: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    color: '#4A8B2C',
    marginBottom: 24,
  },
  articleContainer: {
    marginBottom: 24,
  },
  articleTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  articleText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666',
    lineHeight: 22,
    marginLeft: 8,
    marginBottom: 4,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EBE1',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666',
    marginBottom: 8,
  },
  companyInfo: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#4A8B2C',
  },
});