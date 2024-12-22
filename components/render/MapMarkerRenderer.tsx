import React from 'react';
import { Coord } from '@mj-studio/react-native-naver-map';
import { CustomMarker } from '../map/CustomMarker';
import { useProteinStore } from '@/store/useProteinStore';

interface MapMarkerRendererProps {
  markers: Array<{
    id: string;
    coordinate: Coord;
    title: string;
    imageType?: 'default' | 'no-info' | 'investigating';
  }>;
  onMarkerPress: (marker: {
    id: string;
    coordinate: Coord;
    title: string;
    imageType?: 'default' | 'no-info' | 'investigating';
  }) => void;
  selectedMarkerId: string | null;
}

export const MapMarkerRenderer: React.FC<MapMarkerRendererProps> = ({
  markers,
  onMarkerPress,
  selectedMarkerId,
}) => {
  const { restaurants, nutritionRequests, isLoading, error, fetchAllData } = useProteinStore();

  React.useEffect(() => {
    fetchAllData();
  }, []);

  const getMarkerImageType = (restaurantId: string): 'default' | 'no-info' | 'investigating' => {
    const restaurant = restaurants.find(r => r.restaurant_id === restaurantId);
    const nutritionRequest = nutritionRequests.find(nr => nr.restaurant_id === restaurantId);

    if (restaurant?.has_nutrition_data) {
      return 'default';
    }
    
    if (nutritionRequest?.request_status === '의뢰신청중') {
      return 'investigating';
    }

    return 'no-info';
  };

  const restaurantMarkers = restaurants.map(restaurant => ({
    id: restaurant.restaurant_id,
    coordinate: {
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    },
    title: restaurant.display_name,
    imageType: getMarkerImageType(restaurant.restaurant_id),
  }));

  console.log('Sample Markers:', markers);
  // console.log('Restaurant Markers:', restaurantMarkers);
  console.log('Total Markers:', restaurantMarkers.length + markers.length);

  console.log('Store Status:', {
    isLoading,
    error,
    restaurantsCount: restaurants.length
  });

  const allMarkers = [...markers, ...restaurantMarkers];

  return (
    <>
      {allMarkers.map((marker) => (
        <CustomMarker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          onPress={() => onMarkerPress(marker)}
          size={
            selectedMarkerId === marker.id
              ? { width: 40, height: 40 * 1.33 }
              : { width: 32, height: 32 * 1.33 }
          }
          imageType={marker.imageType as 'default' | 'no-info' | 'investigating'}
        />
      ))}
    </>
  );
}; 