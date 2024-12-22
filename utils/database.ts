import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import axios from 'axios';

// DB 파일 URL 설정
const DB_URL = #######

export interface Restaurant {
  restaurant_id: string;
  display_name: string;
  latitude: number;
  longitude: number;
  category_id: number;
  has_accurate_nutrition: boolean;
  has_nutrition_data: boolean;
}

export interface Menu {
  menu_id: string;
  restaurant_id: string;
  menu_name: string;
  price: number;
  calories: number;
  protein: number;
  sodium: number;
  saturated_fat: number;
  carbohydrates: number;
  image_url: string;
}

export interface RestaurantCategory {
  category_id: number;
  category_name: string;
}

export interface NutritionRequest {
  restaurant_id: string;
  request_status: '의뢰신청중' | '분석완료' | '미신청';
  interest_count: number;
}

// 전역 데이터베이스 인스턴스
let db: SQLite.SQLiteDatabase | null = null;

async function downloadDatabase(): Promise<Uint8Array> {
  try {
    console.log('[다운로드] DB 파일 다운로드 시작');
    const response = await axios.get(
      'https://proteinroad-bucket.s3.ap-northeast-2.amazonaws.com/proteinroad.db',
      {
        responseType: 'arraybuffer',
        headers: {
          'Accept': '*/*'
        }
      }
    );
    console.log('[다운로드] DB 파일 다운로드 완료, 크기:', response.data.byteLength, 'bytes');
    return new Uint8Array(response.data);
  } catch (error) {
    console.error('[다운로드] DB 파일 다운로드 실패:', error);
    throw error;
  }
}

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  try {
    console.log('[DB 초기화] 시작');
    
    if (db) {
      console.log('[DB 초기화] 이미 초기화된 DB 인스턴스 반환');
      return db;
    }

    // 플랫폼별 경로 설정
    let dbPath: string;
    if (Platform.OS === 'ios') {
      console.log('[DB 초기화] iOS 환경 감지');
      const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
      dbPath = `${dbDirectory}/proteinroad.db`;
      console.log('[DB 초기화] iOS DB 경로:', dbPath);

      // SQLite 디렉토리 확인 및 생성
      const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
      if (!dirInfo.exists) {
        console.log('[DB 초기화] SQLite 디렉토리 생성');
        await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
      }
    } else {
      console.log('[DB 초기화] Android 환경 감지');
      const dbDirectory = `${FileSystem.documentDirectory}/SQLite`;
      dbPath = `${dbDirectory}/proteinroad.db`;
      console.log('[DB 초기화] Android DB 경로:', dbPath);

      // SQLite 디렉토리 확인 및 생성 (Android)
      const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
      if (!dirInfo.exists) {
        console.log('[DB 초기화] Android SQLite 디렉토리 생성');
        await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
      }
    }

    // 기존 파일 확인 및 삭제
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log('[DB 초기화] 기존 파일 정보:', fileInfo);
    
    if (fileInfo.exists) {
      console.log('[DB 초기화] 기존 DB 파일 삭제');
      await FileSystem.deleteAsync(dbPath);
    }

    // DB 파일 다운로드 및 저장
    console.log('[DB 초기화] DB 파일 다운로드 시작');
    const fileData = await downloadDatabase();
    
    // Uint8Array를 base64로 변환
    let binary = '';
    fileData.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    const base64Data = btoa(binary);
    
    console.log('[DB 초기화] 파일 저장 시작');
    await FileSystem.writeAsStringAsync(dbPath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log('[DB 초기화] 파일 저장 완료');

    // SQLite DB 열기
    console.log('[DB 초기화] SQLite DB 열기 시도');
    db = await SQLite.openDatabaseAsync('proteinroad.db');
    console.log('[DB 초기화] SQLite DB 열기 성공');
    
    return db;
  } catch (error) {
    console.error('[DB 초기화] 치명적 오류:', error);
    throw error;
  }
}

export const initDatabase = async (): Promise<void> => {
  try {
    console.log('[초기화] 데이터베이스 초기화 시작');
    await openDatabase();
    console.log('[초기화] 데이터베이스 초기화 완료');
  } catch (error) {
    console.error('[초���화] 데이터베이스 초기화 실패:', error);
    throw error;
  }
};

export const loadRestaurants = async (): Promise<Restaurant[]> => {
  try {
    console.log('[식당 로드] 시작');
    if (!db) {
      console.log('[식당 로드] DB 미초기화 상태, 초기화 시도');
      await openDatabase();
    }
    const results = await db!.getAllAsync<Restaurant>('SELECT * FROM restaurants');
    console.log('[식당 로드] 완료, 데이터 수:', results.length);
    return results;
  } catch (error) {
    console.error('[식당 로드] 실패:', error);
    throw error;
  }
};

export const loadMenus = async (): Promise<Menu[]> => {
  try {
    console.log('[메뉴 로드] 시작');
    if (!db) {
      console.log('[메뉴 로드] DB 미초기화 상태, 초기화 시도');
      await openDatabase();
    }
    const results = await db!.getAllAsync<Menu>('SELECT * FROM menus');
    console.log('[메뉴 로드] 완료, 데이터 수:', results.length);
    return results;
  } catch (error) {
    console.error('[메뉴 로드] 실패:', error);
    throw error;
  }
};

export const loadCategories = async (): Promise<RestaurantCategory[]> => {
  try {
    if (!db) {
      await openDatabase();
    }
    return await db!.getAllAsync<RestaurantCategory>('SELECT * FROM restaurant_categories');
  } catch (error) {
    console.error('Load categories error:', error);
    throw error;
  }
};

export const loadNutritionRequests = async (): Promise<NutritionRequest[]> => {
  try {
    if (!db) {
      await openDatabase();
    }
    return await db!.getAllAsync<NutritionRequest>('SELECT * FROM nutrition_requests');
  } catch (error) {
    console.error('Load nutrition requests error:', error);
    throw error;
  }
};
