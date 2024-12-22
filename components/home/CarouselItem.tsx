import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CarouselItemProps {
  title: string;
  href: string;
  imageUrl?: number;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ 
  title, 
  href,
  imageUrl 
}) => {
  // console.log('CarouselItem props:', { title, href, imageUrl });
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    router.push({
      pathname: '/(screens)/content',
      params: { id: href }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ 
      scale: withSpring(isPressed ? 0.95 : 1, {
        damping: 15,
        stiffness: 150
      })
    }],
    shadowOpacity: withSpring(isPressed ? 0.15 : 0.25, {
      damping: 15,
      stiffness: 150
    })
  }));

  const renderImage = () => {
    if (!imageUrl) {
      return (
        <Image 
          source={require('../../assets/images/react-logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }

    return (
      <Image 
        source={imageUrl}
        style={styles.image}
        resizeMode="cover"
      />
    );
  };

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={1}
      >
        {renderImage()}
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Variable',
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 