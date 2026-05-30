import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: { name: string };
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  images: string[];
}

interface AppState {
  // Auth state
  token: string | null;
  setToken: (token: string | null) => void;

  // Users state
  users: User[];
  totalUsers: number;
  loadingUsers: boolean;
  usersCache: Record<string, { users: User[]; total: number }>;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;

  // Products state
  products: Product[];
  totalProducts: number;
  loadingProducts: boolean;
  productsCache: Record<string, { products: Product[]; total: number }>;
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      token: null,
      setToken: (token) => set({ token }),

      // Users state
      users: [],
      totalUsers: 0,
      loadingUsers: false,
      usersCache: {},
      fetchUsers: async (limit, skip, search = '') => {
        const cacheKey = `users-${limit}-${skip}-${search}`;
        const cachedData = get().usersCache[cacheKey];

        // Use cache if available
        if (cachedData) {
          set({ users: cachedData.users, totalUsers: cachedData.total });
          return;
        }

        set({ loadingUsers: true });
        try {
          const url = search
            ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
            : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
          
          const res = await fetch(url);
          const data = await res.json();
          
          set((state) => ({
            users: data.users,
            totalUsers: data.total,
            loadingUsers: false,
            usersCache: {
              ...state.usersCache,
              [cacheKey]: { users: data.users, total: data.total }
            }
          }));
        } catch (error) {
          console.error("Failed to fetch users", error);
          set({ loadingUsers: false });
        }
      },

      // Products state
      products: [],
      totalProducts: 0,
      loadingProducts: false,
      productsCache: {},
      fetchProducts: async (limit, skip, search = '', category = '') => {
        const cacheKey = `products-${limit}-${skip}-${search}-${category}`;
        const cachedData = get().productsCache[cacheKey];

        // Use cache if available
        if (cachedData) {
          set({ products: cachedData.products, totalProducts: cachedData.total });
          return;
        }

        set({ loadingProducts: true });
        try {
          let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
          if (search) {
            url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
          } else if (category && category !== 'all') {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
          }
          
          const res = await fetch(url);
          const data = await res.json();
          
          set((state) => ({
            products: data.products,
            totalProducts: data.total,
            loadingProducts: false,
            productsCache: {
              ...state.productsCache,
              [cacheKey]: { products: data.products, total: data.total }
            }
          }));
        } catch (error) {
          console.error("Failed to fetch products", error);
          set({ loadingProducts: false });
        }
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        token: state.token,
        usersCache: state.usersCache,
        productsCache: state.productsCache 
      }),
    }
  )
);
