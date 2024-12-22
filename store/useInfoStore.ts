import { create } from 'zustand';
import { InfoData, loadInfoData } from '../utils/database_test';

interface InfoStore {
  infoList: InfoData[];
  isLoading: boolean;
  error: string | null;
  fetchInfoList: () => Promise<void>;
}

export const useInfoStore = create<InfoStore>((set) => ({
  infoList: [],
  isLoading: false,
  error: null,
  fetchInfoList: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await loadInfoData();
      set({ infoList: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
})); 