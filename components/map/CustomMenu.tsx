import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CustomMenuProps {
  menu_name: string;
  price: number;
  calories: number;
  protein: number;
  image_url: string | null;
}

export const CustomMenu: React.FC<CustomMenuProps> = ({
  menu_name,
  price,
  calories,
  protein,
  image_url,
}) => {
  const renderImage = () => {
    if (!image_url) {
      return (
        <Image 
          source={require('../../assets/images/default-menu.png')} 
          style={styles.image}
        />
      );
    }

    return (
      <Image 
        source={{ uri: image_url }}
        style={styles.image}
        defaultSource={require('../../assets/images/default-menu.png')}
        onError={(error) => {
          console.log('Image loading error:', error.nativeEvent.error);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderImage()}
      <View style={styles.infoContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.menuName}>{menu_name}</Text>
          <Text style={styles.price}>{price.toLocaleString()} 원</Text>
          <View style={styles.nutritionContainer}>
            <Text style={styles.calories}>{calories}kcal</Text>
          </View>
        </View>
        <View style={styles.proteinContainer}>
          <Text style={styles.proteinLabel}>단백질</Text>
          <Text style={styles.proteinValue}>{protein}g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7ED',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Pretendard-Variable',
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Pretendard-Variable',
  },
  nutritionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calories: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  proteinContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  proteinLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'Pretendard-Variable',
  },
  proteinValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A8B2C',
    fontFamily: 'Pretendard-Variable',
  },
});
