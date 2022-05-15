
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, HStack, VStack } from 'native-base';
import CircleCounter from './components/CircleCounter';

export default function App() {

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <VStack m={10} mt={60}>
          <HStack mt={30} justifyContent="space-around">
            <CircleCounter size={50} count={100} stroke_color={'#444B6F'} />
            <CircleCounter size={50} count={255} stroke_color={'darkorange'}/>
          </HStack>
          <HStack mt={30} justifyContent="space-around">
            <CircleCounter size={50} count={200} stroke_color={'darkblue'} />
            <CircleCounter size={50} count={511} stroke_color={'darkred'} />
          </HStack>
        </VStack>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
