import { create } from 'zustand';
import {
  Restaurant,
  Menu,
  RestaurantCategory,
  NutritionRequest,
  loadRestaurants,
  loadMenus,
  loadCategories,
  loadNutritionRequests,
  initDatabase
} from '../utils/database';

interface ProteinStore {
  restaurants: Restaurant[];
  menus: Menu[];
  categories: RestaurantCategory[];
  nutritionRequests: NutritionRequest[];
  isLoading: boolean;
  error: string | null;
  interestedRestaurants: Set<string>;
  fetchAllData: () => Promise<void>;
  increaseInterestCount: (restaurant_id: string) => boolean;
}

export const useProteinStore = create<ProteinStore>((set, get) => ({
  restaurants: [],
  menus: [],
  categories: [],
  nutritionRequests: [],
  isLoading: false,
  error: null,
  interestedRestaurants: new Set<string>(),
  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      await initDatabase();
      const [
        restaurantsData,
        menusData,
        categoriesData,
        requestsData
      ] = await Promise.all([
        loadRestaurants(),
        loadMenus(),
        loadCategories(),
        loadNutritionRequests()
      ]);

      set({
        restaurants: restaurantsData,
        menus: menusData,
        categories: categoriesData,
        nutritionRequests: requestsData,
        isLoading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  increaseInterestCount: (restaurant_id: string) => {
    const state = get();
    if (state.interestedRestaurants.has(restaurant_id)) {
      return false;
    }

    set((state) => ({
      interestedRestaurants: new Set([...state.interestedRestaurants, restaurant_id]),
      nutritionRequests: state.nutritionRequests.map(request =>
        request.restaurant_id === restaurant_id
          ? { ...request, interest_count: request.interest_count + 1 }
          : request
      )
    }));
    return true;
  },
})); 