import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  animateThemeProgress,
  setThemeProgressInstant,
} from '../utils/themeProgress';

export const useThemeStore = create(
  persist(
    (set) => ({
      scheme: 'light',
      isReady: false,

      setDarkMode: (value) => {
        const next = value ? 'dark' : 'light';
        set({ scheme: next });
        animateThemeProgress(value);
      },
    }),
    {
      name: 'theme-color-scheme',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ scheme: state.scheme }),
      onRehydrateStorage: () => (state) => {
        if (state?.scheme === 'light' || state?.scheme === 'dark') {
          setThemeProgressInstant(state.scheme === 'dark');
        }
        useThemeStore.setState({ isReady: true });
      },
    },
  ),
);

export const selectIsDark = (state) => state.scheme === 'dark';
