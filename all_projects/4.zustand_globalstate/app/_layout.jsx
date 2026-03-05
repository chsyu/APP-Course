import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <Stack>        
        <Stack.Screen name="index" />
        <Stack.Screen name="diary/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
