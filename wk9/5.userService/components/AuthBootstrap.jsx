import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useUserStore } from '../store/useUserStore';

export default function AuthBootstrap() {

  const handleAuthStateChanged = async (user) => {
    const { setUser, clearUser } = useUserStore.getState();
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email ?? undefined,
      });
    } else {
      clearUser();
    }
  }

  useEffect(() => {
    if (!auth) {
      const { clearUser } = useUserStore.getState();
      clearUser();
    } else {
      const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
      return unsubscribe;
    }

  }, []);

  return null;
}
