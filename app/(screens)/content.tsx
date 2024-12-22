import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ContentRenderer, ContentItem } from '@/components/render/ContentRenderer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContentData {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  coverImage: any;
  content: ContentItem[];
}

// Mock data - 실제 앱에서는 API나 데이터베이스에서 가져올 것입니다
const contentData: Record<string, ContentData> = {
  'nutrition-facts': {
    title: '포케? 그거 완전 건강식이지~',
    subtitle: '영양성분표에 숨은진실',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource4.png'),
    content: [
      {
        type: 'text',
        content: '포케는 하와이의 전통 요리로, 신선한 생선과 다양한 채소를 곁들인 건강식입니다. 하지만 모든 포케가 같은 영양가를 가지고 있는 것은 아닙니다.',
      },
      {
        type: 'heading',
        content: '포케의 영양성분',
      },
      {
        type: 'text',
        content: '일반적인 포케 한 그릇(300g)에는 다음과 같은 영양성분이 포함되어 있습니다:\n\n- 단백질: 25g\n- 탄수화물: 40g\n- 지방: 12g\n- 칼로리: 400kcal',
      },
    ],
  },
  'protein-intake': {
    title: '단백질을 쉽게 보충하는 법',
    subtitle: '일상 속 단백질 섭취 가이드',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource13.png'),
    content: [
      {
        type: 'text',
        content: '단백질은 우리 몸의 근육을 만들고 유지하는 데 필수적인 영양소입니다. 하지만 많은 사람들이 충분한 단백질을 섭취하지 못하고 있습니다.',
      },
      {
        type: 'heading',
        content: '일일 권장 단백질 섭취량',
      },
      {
        type: 'text',
        content: '체중 1kg당 1.6~2.2g의 단백질을 섭취하는 것이 권장됩니다. 운동을 많이 하는 사람은 더 많은 양이 필요할 수 있습니다.',
      },
    ],
  },
  'diet-basics': {
    title: '식단 관리의 기본',
    subtitle: '건강한 식단 구성하기',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource15.png'),
    content: [
      {
        type: 'text',
        content: '균형 잡힌 식단은 건강한 생활의 기본입니다. 하루 세끼를 어떻게 구성하느냐에 따라 우리 몸의 건강이 좌우됩니다.',
      },
      {
        type: 'heading',
        content: '식단 구성의 기본 원칙',
      },
      {
        type: 'text',
        content: '1. 단백질: 전체 칼로리의 30%\n2. 탄수화물: 전체 칼로리의 40%\n3. 지방: 전체 칼로리의 30%\n\n이러한 비율을 기본으로 하되, 개인의 목표와 상황에 맞게 조절하는 것이 중요합니다.',
      },
    ],
  },
  'healthy-habits': {
    title: '건강한 식습관 만들기',
    subtitle: '작은 습관의 큰 변화',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource16.png'),
    content: [
      {
        type: 'text',
        content: '건강한 식습관은 하루아침에 만들어지지 않습니다. 작은 변화부터 시작해 점진적으로 개선해 나가는 것이 중요합니다.',
      },
      {
        type: 'heading',
        content: '실천할 수 있는 작은 습관들',
      },
      {
        type: 'text',
        content: '1. 천천히 꼭꼭 씹어 먹기\n2. 규칙적인 식사 시간 지키기\n3. 과식하지 않기\n4. 채소 먼저 먹기\n5. 물 자주 마시기',
      },
    ],
  },
  'protein-foods': {
    title: '단백질 식품 추천',
    subtitle: '다양한 단백질 공급원',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource11.png'),
    content: [
      {
        type: 'text',
        content: '단백질은 다양한 식품을 통해 섭취할 수 있습니다. 동물성과 식물성 단백질을 골고루 섭취하는 것이 좋습니다.',
      },
      {
        type: 'heading',
        content: '추천 단백질 식품',
      },
      {
        type: 'text',
        content: '동물성 단백질:\n- 닭가슴살 (100g당 31g)\n- 계란 (1개당 6g)\n- 연어 (100g당 25g)\n\n식물성 단백질:\n- 두부 (100g당 8g)\n- 렌틸콩 (100g당 9g)\n- 퀴노아 (100g당 4g)',
      },
    ],
  },
  'chicken-salad': {
    title: '닭가슴살 샐러드',
    subtitle: '맛있게 즐기는 건강식',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource9.png'),
    content: [
      {
        type: 'text',
        content: '닭가슴살 샐러드는 건강식의 대표주자입니다. 높은 단백질 함량과 낮은 칼로리로 다이어트와 근력 운동을 하는 사람들에게 인기가 높습니다.',
      },
      {
        type: 'heading',
        content: '영양성분',
      },
      {
        type: 'text',
        content: '1인분 기준:\n- 단백질: 30g\n- 칼로리: 250kcal\n- 탄수화물: 15g\n- 지방: 8g',
      },
    ],
  },
  'salmon-sandwich': {
    title: '연어 샌드위치',
    subtitle: '오메가3가 풍부한 건강식',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource6.png'),
    content: [
      {
        type: 'text',
        content: '연어 포케는 단백질뿐만 아니라 오메가3 지방산이 풍부한 건강식입니다. 신선한 연어와 다양한 채소가 어우러져 영양가도 높고 맛도 좋습니다.',
      },
      {
        type: 'heading',
        content: '영양성분',
      },
      {
        type: 'text',
        content: '1인분 기준:\n- 단백질: 25g\n- 칼로리: 400kcal\n- 오메가3: 2.5g\n- 탄수화물: 40g\n- 지방: 12g',
      },
    ],
  },
  'grilled-chicken': {
    title: '그릴드 치킨',
    subtitle: '담백하고 건강한 맛',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource10.png'),
    content: [
      {
        type: 'text',
        content: '그릴드 치킨은 기름을 최소화하고 닭고기 본연의 맛을 살린 요리입니다. 허브와 스파이스로 맛을 내어 건강하면서도 맛있게 즐길 수 있습니다.',
      },
      {
        type: 'heading',
        content: '영양성분',
      },
      {
        type: 'text',
        content: '1인분 기준:\n- 단백질: 35g\n- 칼로리: 300kcal\n- 탄수화물: 5g\n- 지방: 10g',
      },
    ],
  },
  'protein-bowl': {
    title: '프로틴 볼',
    subtitle: '영양만점 한그릇',
    author: '고단백',
    date: '2024.12.01',
    coverImage: require('../../assets/contents/content-resource13.png'),
    content: [
      {
        type: 'text',
        content: '프로틴 볼은 다양한 재료를 한 그릇에 담아 즐기는 영양만점 메뉴입니다. 퀴노아나 현미를 베이스로 하고 닭가슴살, 달걀, 아보카도 등을 토핑으로 올려 먹습니다.',
      },
      {
        type: 'heading',
        content: '영양성분',
      },
      {
        type: 'text',
        content: '1인분 기준:\n- 단백질: 28g\n- 칼로리: 450kcal\n- 탄수화물: 45g\n- 지방: 15g\n\n다양한 재료가 들어가 영양소가 골고루 포함되어 있습니다.',
      },
    ],
  },
};

export default function ContentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const content = contentData[id as keyof typeof contentData];

  if (!content) {
    return null; // 또는 404 컴포넌트를 보여줄 수 있습니다
  }

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
        <Text style={styles.headerTitle}>프로틴스토어</Text>
        <View style={styles.headerRight} />
      </View>
      <ContentRenderer {...content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
}); 