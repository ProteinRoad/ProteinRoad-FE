import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

interface SquareCarouselProps {
  items: React.ReactNode[];
  gap?: number;
}

export const SquareCarousel: React.FC<SquareCarouselProps> = ({ items, gap = 12 }) => {
  const { width } = Dimensions.get('window');
  const itemSize = width * 0.33; // 화면 너비의 1/3

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { gap, paddingHorizontal: 16 }
      ]}
    >
      {items.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.itemContainer,
            { width: itemSize, height: itemSize }
          ]}
        >
          {item}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    overflow: 'hidden',
  },
}); 