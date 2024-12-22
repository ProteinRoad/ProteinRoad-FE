import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SquareCarousel } from '../home/SquareCarousel';

interface SectionRendererProps {
  title: string;
  carouselItems: React.ReactNode[];
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  title,
  carouselItems,
}) => {
  return (
    <View style={styles.section}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <SquareCarousel items={carouselItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
}); 