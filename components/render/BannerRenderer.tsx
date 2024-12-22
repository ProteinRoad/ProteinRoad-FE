import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BannerRendererProps {
  title: string;
  subtitle: string;
  imageSource: any;
  onPress: () => void;
}

export const BannerRenderer: React.FC<BannerRendererProps> = ({
  title,
  subtitle,
  imageSource,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const bannerHeight = (width * 2) / 3; // 3:2 aspect ratio

  return (
    <TouchableOpacity 
      style={[
        styles.banner,
        { 
          marginTop: -insets.top,
          height: bannerHeight + insets.top,
        }
      ]} 
      onPress={onPress}
    >
      <Image 
        source={imageSource}
        style={[styles.bannerImage, { height: bannerHeight + insets.top }]}
        resizeMode="cover"
      />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>{subtitle}</Text>
        <View style={styles.bannerArrow}>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  bannerArrow: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
}); 