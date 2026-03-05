import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';


export default function RootLayout() {
  const { initAuthListener, loadUserFromLocal } = useUserStore();

  useEffect(() => {
    // 初始化时先从本地加载用户数据（快速显示）
    loadUserFromLocal();
    
    // 初始化认证状态监听器
    const unsubscribe = initAuthListener();
    
    return () => {
      // 清理监听器
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen 
            name="index"
            options={{
              title: `我的日記`,
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen 
            name="login"
            options={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen 
            name="search"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="settings"
            options={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen 
            name="profile"
            options={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="diary/[id]" />
        </Stack>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
