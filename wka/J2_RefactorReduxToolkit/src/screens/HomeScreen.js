import { NativeBaseProvider, Center, HStack, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../redux/counterSlice";
import { selectCounter } from "../redux/counterSlice";

// Then, you can use the redux state management:
// get states by useSelector
// send actions by useDispatch
const HomeScreen = () => {
   // Get states from store
   const counterValue = useSelector(selectCounter);
 
   // Define a dispatch to send actions
   const dispatch = useDispatch();
 
   return (
     <NativeBaseProvider>
       <Center flex={1} bg={"white"}>
         <HStack space={20}>
           <Button borderRadius={0} width={70} onPress={() => dispatch(setCounter(counterValue + 1))}>
             <Text fontSize={40} color="white">+</Text>
           </Button>
           <Button borderRadius={0} width={70} onPress={() => dispatch(setCounter(counterValue - 1))}>
             <Text fontSize={40} color="white">-</Text>
           </Button>
         </HStack>
         <Text fontSize={40} mt={20} color={"black"}>
           {counterValue}
         </Text>
       </Center>
     </NativeBaseProvider>
   );
 }

 export default HomeScreen;