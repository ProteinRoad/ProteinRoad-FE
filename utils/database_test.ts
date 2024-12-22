import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';

export interface InfoData {
  id: number;
  placeName: string;
  subtext: string;
}
  
// 전역 데이터베이스 인스턴스
let db: SQLite.SQLiteDatabase | null = null;

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;  // 이미 초기화된 경우 재사용

  const asset = require('../assets/data/test.db');
  const assetModule = Asset.fromModule(asset);
  await assetModule.downloadAsync();

  if (!assetModule.localUri) {
    throw new Error('Could not get asset local URI');
  }

  let dbPath: string;
  
  if (Platform.OS === 'ios') {
    const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
    dbPath = `${dbDirectory}/test.db`;
    console.log('[iOS-TEST] DB 경로:', dbPath);

    // SQLite 디렉토리 확인 및 생성
    const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
    if (!dirInfo.exists) {
      console.log('[iOS-TEST] SQLite 디렉토리 생성');
      await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
    }

    // iOS 파일 처리
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log('[iOS-TEST] 기존 파일 확인:', fileInfo);
    
    if (fileInfo.exists) {
      console.log('[iOS-TEST] 기존 파일 삭제');
      await FileSystem.deleteAsync(dbPath);
    }

    console.log('[iOS-TEST] 파일 복사 시작:', {
      from: assetModule.localUri,
      to: dbPath
    });

    await FileSystem.copyAsync({
      from: assetModule.localUri,
      to: dbPath
    });

    const copyResult = await FileSystem.getInfoAsync(dbPath);
    console.log('[iOS-TEST] 파일 복사 결과:', copyResult);

  } else {
    // Android
    dbPath = `${FileSystem.documentDirectory}/SQLite/test.db`;
    console.log('[Android-TEST] DB 경로:', dbPath);

    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log('[Android-TEST] 기존 파일 확인:', fileInfo);
    
    if (fileInfo.exists) {
      console.log('[Android-TEST] 기존 파일 삭제');
      await FileSystem.deleteAsync(dbPath);
    }

    console.log('[Android-TEST] 파일 복사 시작:', {
      from: assetModule.localUri,
      to: dbPath
    });

    try {
      await FileSystem.copyAsync({
        from: assetModule.localUri,
        to: dbPath
      });

      const copyResult = await FileSystem.getInfoAsync(dbPath);
      console.log('[Android-TEST] 파일 복사 결과:', copyResult);
    } catch (error) {
      console.error('[Android-TEST] 파일 복사 실패:', error);
      throw error;
    }
  }

  console.log(`[${Platform.OS}-TEST] SQLite DB 열기 시작`);
  db = await SQLite.openDatabaseAsync(`test.db`);
  console.log(`[${Platform.OS}-TEST] SQLite DB 열기 완료`);
  
  return db;
}

export const initDatabase = async (): Promise<void> => {
  try {
    await openDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const loadInfoData = async (): Promise<InfoData[]> => {
  try {
    if (!db) {
      await openDatabase();
    }

    if (!db) {
      throw new Error('Database not initialized');
    }

    return await db.getAllAsync<InfoData>('SELECT * FROM info');
  } catch (error) {
    console.error('Load data error:', error);
    throw error;
  }
}; 