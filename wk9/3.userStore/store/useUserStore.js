import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (next) => {
        if (next === null) {
          set({ user: null });
          return;
        }
        set((state) => ({
          user: { ...(state.user ?? {}), ...next },
        }));
      },

      /** 前端範例無遠端資料，保留介面供 login 呼叫 */
      syncUser: async () => {},

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
