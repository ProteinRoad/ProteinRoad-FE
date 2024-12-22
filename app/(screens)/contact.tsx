import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { composeCustomerServiceEmail, InquiryCategory, INQUIRY_CATEGORIES } from '@/utils/email';

export default function Contact() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: InquiryCategory }>();
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>('일반문의');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (category && INQUIRY_CATEGORIES.includes(category as InquiryCategory)) {
      setSelectedCategory(category as InquiryCategory);
    }
  }, [category]);

  const getPlaceholder = (category: InquiryCategory) => {
    switch (category) {
      case '일반문의':
        return '문의하실 내용을 입력해주세요.';
      case '업체문의':
        return '업체명, 담당자명, 연락처와 함께 문의 내용을 입력해주세요.';
      case '음식점 제보하기':
        return '음식점명, 위치(주소), 메뉴 정보와 함께 제보 내용을 입력해주세요.';
      case '영양정보요청':
        return '음식점명, 메뉴명과 함께 요청사항을 입력해주세요.';
      case '앱 불편신고':
        return '발생 일시, 발생 화면을 입력해주세요.';
      default:
        return '문의하실 내용을 입력해주세요.';
    }
  };

  const handleSubmit = async () => {
    if (!details.trim()) {
      Alert.alert('알림', '문의 내용을 입력해주세요.');
      return;
    }

    try {
      await composeCustomerServiceEmail(selectedCategory, details);
    } catch (error) {
      Alert.alert('오류', '이메일을 보내는 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
        <Text style={styles.headerTitle}>문의하기</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>문의 유형</Text>
        <View style={styles.categoryContainer}>
          {INQUIRY_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>문의 내용</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={8}
          placeholder={getPlaceholder(selectedCategory)}
          value={details}
          onChangeText={setDetails}
          textAlignVertical="top"
        />

        <TouchableOpacity 
          style={[styles.submitButton, !details.trim() && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!details.trim()}
        >
          <Text style={[styles.submitButtonText, !details.trim() && styles.submitButtonTextDisabled]}>
            문의하기
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 28,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4F7ED',
  },
  selectedCategory: {
    backgroundColor: '#4A8B2C',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    color: '#666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#F4F7ED',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    marginBottom: 24,
    minHeight: 160,
  },
  submitButton: {
    backgroundColor: '#4A8B2C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#E8EBE1',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
}); 