import React from 'react';
import { BannerRenderer } from '@/components/render/BannerRenderer';
import { useRouter } from 'expo-router';

interface HomeBannerProps {
  title: string;
  subtitle: string;
  imageSource: any;
  contentId?: string;
  onPress?: () => void;
}

export const HomeBanner: React.FC<HomeBannerProps> = ({
  title,
  subtitle,
  imageSource,
  contentId = 'nutrition-facts',
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/(screens)/content',
        params: { id: contentId }
      });
    }
  };

  return (
    <BannerRenderer
      title={title}
      subtitle={subtitle}
      imageSource={imageSource}
      onPress={handlePress}
    />
  );
}; 