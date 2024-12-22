import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProteinStore } from '@/store/useProteinStore';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

interface SearchBarProps {
  onSelectRestaurant: (latitude: number, longitude: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectRestaurant }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isInSearch, setIsInSearch] = useState(false);
  const { restaurants } = useProteinStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.display_name.toLowerCase().includes(debouncedText.toLowerCase())
  );

  const handleSelectRestaurant = (latitude: number, longitude: number) => {
    onSelectRestaurant(latitude, longitude);
    setSearchText('');
    setDebouncedText('');
    setIsSearching(false);
    setIsInSearch(false);
  };

  const handleStartSearch = () => {
    setIsInSearch(true);
    setIsSearching(true);
  };

  const handleCancelSearch = () => {
    setSearchText('');
    setDebouncedText('');
    setIsSearching(false);
    setIsInSearch(false);
  };

  const renderHighlightedText = (text: string, searchTerm: string) => {
    if (!searchTerm) return <Text style={styles.resultText}>{text}</Text>;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <Text style={styles.resultText}>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <Text key={i} style={styles.highlightedText}>{part}</Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  if (!isInSearch) {
    return (
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleStartSearch}
      >
        <Ionicons name="search" size={18} color="#666" />
        <Text style={styles.searchButtonText}>검색</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, isSearching && styles.searchBarActive]}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="식당 이름으로 검색"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsSearching(true)}
          placeholderTextColor="#999"
          autoFocus
        />
        {searchText !== '' ? (
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setDebouncedText('');
            }}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleCancelSearch}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        )}
      </View>

      {isSearching && debouncedText !== '' && (
        <View style={styles.resultsContainer}>
          {filteredRestaurants.length > 0 ? (
            <FlatList
              data={filteredRestaurants}
              keyExtractor={item => item.restaurant_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectRestaurant(item.latitude, item.longitude)}
                >
                  {renderHighlightedText(item.display_name, debouncedText)}
                </TouchableOpacity>
              )}
              style={styles.resultsList}
            />
          ) : (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>찾는 식당이 없습니다.</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 70,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1,
  },
  searchButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchBarActive: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontFamily: 'Pretendard-Variable',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultsList: {
    borderRadius: 8,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Pretendard-Variable',
  },
  noResultContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Variable',
  },
  highlightedText: {
    color: '#4A8B2C',
    fontWeight: '600',
  },
}); 