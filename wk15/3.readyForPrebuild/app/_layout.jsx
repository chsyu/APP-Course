import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { animatedStackHeaderOptions } from '../navigation/animatedStackHeader';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthBootstrap from '../components/AuthBootstrap';
import DiarySyncBootstrap from '../components/DiarySyncBootstrap';
import { useUserStore } from '../store/useUserStore';
import { useThemeColor } from '../hooks/useTheme';

function RootStack() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const avatar = user?.avatar;
  const isLoggedIn = Boolean(user?.uid);
  const headerColor = useThemeColor('headerIcon');
  const headerOptions = animatedStackHeaderOptions(headerColor);

  return (
    <Stack screenOptions={headerOptions}>
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
                <Ionicons name="search" size={24} color={headerColor} />
              </Pressable>
              <Pressable
                onPress={() => router.push('/settings')}
                style={{ marginRight: 16 }}
              >
                <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
                  {isLoggedIn && avatar ? (
                    <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
                  ) : (
                    <Ionicons name="person" size={24} color={headerColor} />
                  )}
                </View>
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{ headerBackButtonDisplayMode: 'minimal' }}
      />
      <Stack.Screen name="settings" />
      <Stack.Screen
        name="backup"
        options={{ headerBackButtonDisplayMode: 'minimal' }}
      />
      <Stack.Screen name="profile" />
      <Stack.Screen name="diary/[id]" />
    </Stack>
  );
}


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AuthBootstrap />
        <DiarySyncBootstrap />
        <RootStack />
        <StatusBar />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
