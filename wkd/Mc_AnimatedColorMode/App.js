import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './HomeScreen';

export default function App() {

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <HomeScreen />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
