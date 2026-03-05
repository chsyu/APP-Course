import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, getCurrentUser } from '../services/authService';
import { getUserProfile, updateUserProfile as updateUserProfileService, getUserFromLocal } from '../services/userService';

// 创建 Zustand store
export const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // 从本地加载用户数据
      loadUserFromLocal: async () => {
        try {
          const currentUser = getCurrentUser();
          if (!currentUser) {
            return;
          }

          const localUser = await getUserFromLocal(currentUser.uid);
          if (localUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
                ...localUser,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('从本地加载用户数据失败:', error);
        }
      },

      // 更新用户资料（同时更新 Firestore 和本地）
      updateUserProfile: async (updates) => {
        try {
          const { user } = get();
          if (!user || !user.uid) {
            throw new Error('用户未登录');
          }

          set({ isLoading: true });

          // 更新 Firestore 和本地
          const result = await updateUserProfileService(user.uid, updates);
          
          if (result.success) {
            // 更新本地状态
            set((state) => ({
              user: {
                ...state.user,
                ...updates,
              },
            }));
          } else {
            throw new Error(result.error || '更新失败');
          }

          set({ isLoading: false });
          return { success: true, error: null };
        } catch (error) {
          console.error('更新用户资料失败:', error);
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // 同步用户数据（Firestore ↔ 本地）
      syncUser: async () => {
        try {
          const currentUser = getCurrentUser();
          if (!currentUser) {
            return { success: false, error: '用户未登录' };
          }

          set({ isLoading: true });

          // 从 Firestore 获取最新数据
          const result = await getUserProfile(currentUser.uid);
          
          if (result.user) {
            // Firestore 中有用户数据，更新完整信息
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
                ...result.user,
              },
              isAuthenticated: true,
            });
          } else {
            // Firestore 中没有用户数据，但用户已认证，保持基本状态
            // 确保 isAuthenticated 为 true
            const { user } = get();
            if (user && user.uid === currentUser.uid) {
              // 如果已经有基本用户信息，保持它并确保 isAuthenticated 为 true
              set({
                isAuthenticated: true,
              });
            } else {
              // 如果没有用户信息，设置基本信息
              set({
                user: {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  displayName: currentUser.email?.split('@')[0] || '用户',
                  avatar: null,
                },
                isAuthenticated: true,
              });
            }
          }

          set({ isLoading: false });
          return { success: true, error: null };
        } catch (error) {
          console.error('同步用户数据失败:', error);
          // 即使同步失败，也确保认证状态正确
          const currentUser = getCurrentUser();
          if (currentUser) {
            const { user } = get();
            if (!user || user.uid !== currentUser.uid) {
              set({
                user: {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  displayName: currentUser.email?.split('@')[0] || '用户',
                  avatar: null,
                },
                isAuthenticated: true,
              });
            } else {
              set({ isAuthenticated: true });
            }
          }
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // 初始化认证监听
      initAuthListener: () => {
        const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            // 用户已登录，同步数据
            await get().syncUser();
          } else {
            // 用户已登出，清除状态
            get().clearUser();
          }
        });

        // 返回取消监听的函数
        return unsubscribe;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // 只持久化 user 和 isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

