import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {

  return (
    <>
      <Stack>        
        <Stack.Screen name="index" />
        <Stack.Screen name="diary/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
