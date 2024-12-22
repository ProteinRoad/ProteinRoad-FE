import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SectionRenderer } from '@/components/render/SectionRenderer';
import { CarouselItem } from './CarouselItem';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface HomeSectionProps {
  title: string;
  items: Array<{
    title: string;
    href: string;
    imageUrl?: number;
  }>;
  emoji?: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  items,
  emoji,
}) => {
  const carouselItems = items.map((item, index) => {
    // console.log('HomeSection item:', item);
    return (
      <CarouselItem
        key={index}
        title={item.title}
        href={item.href}
        imageUrl={item.imageUrl}
      />
    );
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1, {
      damping: 15,
      stiffness: 150
    }) }]
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.sectionWrapper}>
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            {emoji && <Text style={styles.emoji}>{emoji}</Text>}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <SectionRenderer
          title=""
          carouselItems={carouselItems}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
  sectionWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: '#FFFFFF',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.5,
  },
  emoji: {
    fontSize: 24,
  },
}); 