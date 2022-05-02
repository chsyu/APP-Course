import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import MapScreen from './screens/MapScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <MapScreen />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

