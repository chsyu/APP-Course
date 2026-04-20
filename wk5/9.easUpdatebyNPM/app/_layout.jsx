import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="diary/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </KeyboardProvider>
  );
}
