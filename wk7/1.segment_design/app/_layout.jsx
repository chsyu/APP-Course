import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors } from '../utils/color';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen
          name="(diary)"
          options={{
            title: '我的日記',
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
  );
}
