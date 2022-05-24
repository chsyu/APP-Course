import { useState } from "react"
import {
   Box,
   Text,
   Heading,
   VStack,
   FormControl,
   Input,
   Link,
   Button,
   HStack,
   Center,
} from "native-base";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withTiming,
   Easing,
} from 'react-native-reanimated'; import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/accountSlice"

const AnimatedButton = Animated.createAnimatedComponent(Button);

const LoginScreen = () => {
   const dispatch = useDispatch();
   const [loginRequest, setLoginRequest] = useState(false);
   const rotation = useSharedValue(0);
   const btnWidth = useSharedValue("100%");
   const animatedSpinnerStyles = useAnimatedStyle(() => {
      return {
         transform: [
            {
               rotateZ: `${rotation.value}deg`,
            },
         ],
      };
   }, [rotation.value]);

   const animatedButtonStyles = useAnimatedStyle(() => {
      return {
         width: btnWidth.value,
      };
   }, [btnWidth.value]);

   const onPressButton = () => {
      // dispatch(login())
      setLoginRequest(!loginRequest);
      if (loginRequest){
         rotation.value = withTiming(0, {
               duration: 1000,
               easing: Easing.linear,
            });
         btnWidth.value = withTiming('100%', {
            duration: 400,
            easing: Easing.linear,
         });
      } else {
         rotation.value = withRepeat(
            withTiming(360, {
               duration: 1000,
               easing: Easing.linear,
            }),
            -1
         );
         btnWidth.value = withTiming("15", {
            duration: 300,
            easing: Easing.linear,
         });
      }
   }

   return (
      <Center w="100%" flex={1}
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "white" }}
      >
         <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
               color: "warmGray.50"
            }}>
               Welcome
            </Heading>
            <Heading mt="1" _dark={{
               color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
               Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
               <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input />
               </FormControl>
               <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input type="password" />
                  <Link _text={{
                     fontSize: "xs",
                     fontWeight: "500",
                     color: "indigo.500"
                  }} alignSelf="flex-end" mt="1">
                     Forget Password?
                  </Link>
               </FormControl>
               <AnimatedButton mt="2" h="10" w="100%" mx="auto" colorScheme="indigo"
                  borderRadius={loginRequest ? 48 : null}
                  height={loginRequest ? "10" : null}
                  style={animatedButtonStyles}
                  onPress={onPressButton}
               >
                  {  
                     loginRequest
                     ? <Animated.View style={[styles.spinner, animatedSpinnerStyles]} />
                     : 'Sign in'
                  }
               </AnimatedButton>
               <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="coolGray.600" _dark={{
                     color: "warmGray.200"
                  }}>
                     I'm a new user.{" "}
                  </Text>
                  <Link _text={{
                     color: "indigo.500",
                     fontWeight: "medium",
                     fontSize: "sm"
                  }} href="#">
                     Sign Up
                  </Link>
               </HStack>
            </VStack>
         </Box>
      </Center>
   );
};

const styles = StyleSheet.create({
   buttonStyle: {
      color: "white",
      backgroundColor: 'black',
      textAlign: 'center',
      paddingVertical: 10,
      width: '100%',
      borderRadius: 200,
   },
   spinner: {
      height: 20,
      width: 20,
      borderRadius: 30,
      borderWidth: 4,
      borderTopColor: '#f5f5f5',
      borderRightColor: '#f5f5f5',
      borderBottomColor: 'lightblue',
      borderLeftColor: 'lightblue',
   },
})

export default LoginScreen;
