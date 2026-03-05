import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { colors } from '../utils/color';


export default function RootLayout() {
  const router = useRouter();

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
            name="search"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="diary/[id]" />
        </Stack>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
