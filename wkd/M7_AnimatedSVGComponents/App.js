
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, HStack, VStack } from 'native-base';
import CircleCounter from './components/CircleCounter';

export default function App() {

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <VStack m={10}>
          <HStack >
            <CircleCounter R={60} count={100} stroke_color={'#444B6F'} />
            <CircleCounter R={60} count={255} stroke_color={'orange'}/>
          </HStack>
          <HStack >
            <CircleCounter R={60} count={200} stroke_color={'blue'} />
            <CircleCounter R={60} count={511} stroke_color={'red'} />
          </HStack>
        </VStack>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
