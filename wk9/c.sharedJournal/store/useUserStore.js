import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile, syncPublicProfileFromUserFields } from '../services/userService';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (next) => {
        if (next === null) {
          set({ user: null });
          return;
        }
        const merged = { ...(get().user ?? {}), ...next };
        if (!merged.uid) return;
        set({
          user: {
            uid: merged.uid,
            email: merged.email,
            userName: merged.userName ?? '',
            avatar: merged.avatar ?? null,
          },
        });
      },

      syncUser: async () => {
        const current = get().user;
        if (!current?.uid) return;
        const profile = await getUserProfile(current.uid);
        if (!profile) return;

        await syncPublicProfileFromUserFields(current.uid, {
          userName: profile.userName,
          avatar: profile.avatar,
          email: profile.email ?? current.email,
        });

        set((state) => {
          const prev = state.user ?? {};
          return {
            user: {
              uid: prev.uid,
              email: profile.email ?? prev.email,
              userName: profile.userName ?? prev.userName ?? '',
              avatar:
                profile.avatar !== undefined ? profile.avatar : (prev.avatar ?? null),
            },
          };
        });
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
