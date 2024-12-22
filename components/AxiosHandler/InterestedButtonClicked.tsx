import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Location {
  latitude: number;
  longitude: number;
}

interface InterestedData {
  userId: string;
  buttonValue: string;
  location: Location;
  restaurantId: string;
  restaurantName: string;
}

interface ServerResponse {
  body: string;
  headers: {
    [key: string]: string;
  };
  statusCode: number;
}

const API_ENDPOINT = ########
const MAX_RETRIES = 1;
const USER_ID_KEY = '@protein_road_user_id';

// UUID 가져오기 (없으면 생성)
export const getUserId = async (): Promise<string> => {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      userId = uuid.v4() as string;
      await AsyncStorage.setItem(USER_ID_KEY, userId);
      console.log('New user ID generated:', userId);
    } else {
      console.log('Existing user ID found:', userId);
    }
    
    return userId;
  } catch (error) {
    console.error('Error managing user ID:', error);
    // 에러 발생 시 임시 UUID 생성 (저장은 하지 않음)
    return uuid.v4() as string;
  }
};

export const sendInterestedData = async (data: InterestedData): Promise<boolean> => {
  let retries = 0;
  
  const attemptRequest = async (): Promise<boolean> => {
    try {
      // 데이터 형식을 명시적으로 변환
      const requestData = {
        userId: data.userId,
        buttonValue: data.buttonValue,
        location: {
          latitude: Number(data.location.latitude),
          longitude: Number(data.location.longitude)
        },
        restaurantId: String(data.restaurantId),
        restaurantName: String(data.restaurantName),
        logTimestamp: new Date().toISOString(),
        timestamp: new Date().toISOString()
      };

      console.log('Request data structure:', JSON.stringify(requestData, null, 2));

      const response = await axios.post<ServerResponse>(
        API_ENDPOINT,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 10000, // 타임아웃 증가
        }
      );

      // response.data.body는 문자열이므로 파싱이 필요합니다
      const responseBody = JSON.parse(response.data.body);
      console.log('Parsed response:', responseBody);
      return responseBody.success || false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('AWS Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data
          }
        });
      } else {
        console.error('Unexpected error:', error);
      }
      
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Retrying... Attempt ${retries} of ${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return attemptRequest();
      }
      
      return false;
    }
  };

  return attemptRequest();
};

export const handleInterestClick = async (
  location: Location,
  restaurantId: string,
  restaurantName: string
) => {
  try {
    const userId = await getUserId();
    
    const data: InterestedData = {
      userId,
      buttonValue: 'submit',
      location,
      restaurantId,
      restaurantName
    };

    const success = await sendInterestedData(data);
    if (success) {
      console.log('Successfully sent interest data');
      Alert.alert('알림', '관심 등록이 완료되었습니다.');
      return true;
    } else {
      console.error('Failed to send interest data after retries');
      Alert.alert('알림', '관심 등록에 실패했습니다. 다시 시도해 주세요.');
      return false;
    }
  } catch (error) {
    console.error('Error in handleInterestClick:', error);
    Alert.alert('알림', '관심 등록 중 오류가 발생했습니다.');
    return false;
  }
};

export default handleInterestClick;
