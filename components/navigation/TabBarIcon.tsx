// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

interface TabBarIconProps extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  scale?: number;
}

export function TabBarIcon({ style, scale = 1, ...rest }: TabBarIconProps) {
  const iconSize = Math.max(20, Math.min(24, 24 * scale)); // 최소 20, 최대 24
  const marginBottom = -Math.max(2, Math.min(3, 3 * scale)); // 최소 -2, 최대 -3

  return (
    <Ionicons 
      size={iconSize} 
      style={[
        { 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: marginBottom 
        }, 
        style
      ]} 
      {...rest} 
    />
  );
}