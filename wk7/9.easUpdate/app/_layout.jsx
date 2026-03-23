import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../utils/color';

export default function RootLayout() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen
            name="(diary)"
            options={{
              title: '我的日記',
              headerRight: () => (
                <Pressable
                  onPress={() => router.push('/search')}
                  style={{ marginRight: 16 }}
                >
                  <Ionicons name="search" size={24} color="#000" />
                </Pressable>
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
          <Stack.Screen name="diary/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
