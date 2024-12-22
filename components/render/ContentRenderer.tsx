import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export type ContentType = 'text' | 'image' | 'heading';

export interface ContentItem {
  type: ContentType;
  content: string;
  style?: any;
}

export interface ContentRendererProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  coverImage?: any;
  content: ContentItem[];
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  title,
  subtitle,
  author,
  date,
  coverImage,
  content,
}) => {
  const renderContent = (item: ContentItem, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <Text key={index} style={[styles.paragraph, item.style]}>
            {item.content}
          </Text>
        );
      case 'image':
        return (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={typeof item.content === 'string' ? { uri: item.content } : item.content}
              style={[styles.contentImage, item.style]}
              resizeMode="cover"
            />
          </View>
        );
      case 'heading':
        return (
          <Text key={index} style={[styles.heading, item.style]}>
            {item.content}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {coverImage && (
          <View style={styles.coverImageContainer}>
            <Image
              source={coverImage}
              style={styles.coverImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          
          <View style={styles.metaInfo}>
            {author && (
              <View style={styles.authorContainer}>
                <Ionicons name="person-outline" size={14} color="#666" />
                <Text style={styles.author}>{author}</Text>
              </View>
            )}
            {date && (
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.date}>{date}</Text>
              </View>
            )}
          </View>

          {content.map((item, index) => renderContent(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  coverImageContainer: {
    width: width,
    height: width * 0.6,
    backgroundColor: '#F5F5F5',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Pretendard-Variable',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'Pretendard-Variable',
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
    gap: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Pretendard-Variable',
  },
  imageContainer: {
    width: '100%',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  contentImage: {
    width: '100%',
    height: width * 0.6,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'Pretendard-Variable',
  },
}); 