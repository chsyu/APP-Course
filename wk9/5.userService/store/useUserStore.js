import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../services/userService';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (next) => {
        set((state) => ({
          user: { ...(state.user ?? {}), ...next },
        }));
      },

      syncUser: async () => {
        const current = get().user;
        if (!current?.uid) return;
        const profile = await getUserProfile(current.uid);
        if (!profile) return;

        set((state) => ({
          user: {
            ...(state.user ?? {}),
            ...profile,
            // Backward compatibility for existing displayName field in old data.
            userName: profile.userName ?? profile.displayName ?? state.user?.userName ?? '',
          },
        }));
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
