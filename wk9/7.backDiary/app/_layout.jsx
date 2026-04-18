import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../utils/color';
import AuthBootstrap from '../components/AuthBootstrap';
import { useUserStore } from '../store/useUserStore';

export default function RootLayout() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const avatar = user?.avatar;
  const isLoggedIn = Boolean(user?.uid);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AuthBootstrap />
        <Stack>
          <Stack.Screen
            name="(diary)"
            options={{
              title: '我的日記',
              headerRight: () => (
                <View className="flex-row items-center gap-4">
                  <Pressable
                    onPress={() => router.push('/search')}
                    style={{ marginRight: 0 }}
                  >
                    <Ionicons name="search" size={24} color="#000" />
                  </Pressable>
                  <Pressable
                    onPress={() => router.push('/settings')}
                    style={{ marginRight: 16 }}
                  >
                    <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
                      {isLoggedIn && avatar ? (
                        <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
                      ) : (
                        <Ionicons name="person" size={24} color="#000" />
                      )}
                    </View>
                  </Pressable>
                </View>
              ),
              headerStyle: {
                backgroundColor: colors.primary,
                elevation: 0,
                shadowOpacity: 0,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 0,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerStyle: { backgroundColor: colors.primary },
              headerShadowVisible: false,
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerStyle: { backgroundColor: colors.primary },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="sync"
            options={{
              headerStyle: { backgroundColor: colors.primary },
              headerShadowVisible: false,
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerStyle: { backgroundColor: colors.primary },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="diary/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
