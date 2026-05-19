import { useEffect } from 'react';
import { subscribeToAuthState } from '../services/authService';
import { useUserStore } from '../store/useUserStore';

/**
 * 將 Firebase Auth 狀態同步至 Zustand（單一真相來源）。
 */
export default function AuthBootstrap() {
  useEffect(() => {
    return subscribeToAuthState(async (user) => {
      const { setUser, clearUser } = useUserStore.getState();
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email ?? undefined,
        });
      } else {
        clearUser();
      }
    });
  }, []);

  return null;
}
