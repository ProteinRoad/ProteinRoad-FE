import React, { useState } from 'react';
import { NaverMapMarkerOverlay, Coord } from '@mj-studio/react-native-naver-map';
import { Platform } from 'react-native';

interface CustomMarkerProps {
  coordinate: Coord;
  title?: string;
  onPress?: () => void;
  size?: {
    width: number;
    height: number;
  };
  imageType?: 'default' | 'no-info' | 'investigating';
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  coordinate,
  title,
  onPress,
  size = { width: 32, height: 32 * 1.33 },
  imageType = 'default'
}) => {
  const [opacity, setOpacity] = useState(1);

  const handlePress = () => {
    setOpacity(0.7);
    let currentOpacity = 0.7;
    const step = (1 - 0.5) / 10;
    const interval = setInterval(() => {
      currentOpacity += step;
      if (currentOpacity >= 1) {
        currentOpacity = 1;
        clearInterval(interval);
      }
      setOpacity(currentOpacity);
    }, 20);

    onPress?.();
  };

  const getMarkerImage = () => {
    switch (imageType) {
      case 'no-info':
        return require('../../assets/pins/no-info.png');
      case 'investigating':
        return require('../../assets/pins/investigating.png');
      default:
        return require('../../assets/pins/default.png');
    }
  };

  return (
    <NaverMapMarkerOverlay
      latitude={coordinate.latitude}
      longitude={coordinate.longitude}
      onTap={handlePress}
      anchor={{ x: 0.5, y: 1 }}
      width={size.width}
      height={size.height}
      alpha={opacity}
      isIconPerspectiveEnabled={true}
      isHideCollidedCaptions={true}
      caption={{
        text: title || '',
        textSize: Platform.select({
          ios: 14,
          android: 16,
        }),
        color: 'brown',
        haloColor: '#ffffff',
        requestedWidth: 200,
        minZoom: 9,
        maxZoom: 16,
      }}
      image={getMarkerImage()}
    />
  );
}; 