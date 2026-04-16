import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { getUserProfile } from '../services/userService';

export const useUserStore = create(
  persist(
    (set, get) => ({
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

      syncUser: async () => {
        const uid = auth?.currentUser?.uid;
        if (!uid) return;
        const profile = await getUserProfile(uid);
        const email = auth.currentUser?.email ?? get().user?.email;
        set((state) => ({
          user: {
            ...(state.user ?? {}),
            uid,
            email,
            displayName: profile?.displayName ?? state.user?.displayName,
            avatar: profile?.avatar ?? state.user?.avatar ?? null,
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
