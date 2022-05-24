import { Box, Center } from "native-base";
import { useEffect } from "react";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withTiming,
   Easing,
} from 'react-native-reanimated';
import { useSelector } from "react-redux";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { selectLogin } from "../redux/accountSlice";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const AuthScreen = () => {
   const loginPosition = useSharedValue('0%');
   const registerPosition = useSharedValue('100%');
   const login = useSelector(selectLogin);

   const loginStyle = useAnimatedStyle(() => {
      return { left: loginPosition.value }
   }, [loginPosition.value]);

   const registerStyle = useAnimatedStyle(() => {
      return { left: registerPosition.value }
   }, [registerPosition.value]);

   useEffect(() => {
      if (login.hasAccount) {
         loginPosition.value = withTiming("0%", {
            duration: 2000,
            easing: Easing.out(Easing.exp),
         }, () => console.log(`loginPosition = ${loginPosition.value}`));
         registerPosition.value = withTiming("100%", {
            duration: 1000,
            easing: Easing.out(Easing.exp),
         }, () => console.log(`registerPosition = ${registerPosition.value}`));
      } else {
         loginPosition.value = withTiming("100%", {
            duration: 1000,
            easing: Easing.out(Easing.exp),
         });
         registerPosition.value = withTiming("0%", {
            duration: 2000,
            easing: Easing.out(Easing.exp),
         });
      }
   }, [login])

   return (
      <Center flex={1}
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "white" }}
      >
         <AnimatedBox
            w="100%" flex={1}
            position="absolute" style={loginStyle}
         >
            <LoginScreen /></AnimatedBox>
         <AnimatedBox
            w="100%" flex={1}
            position="absolute"
            style={registerStyle}
         >
            <RegisterScreen /></AnimatedBox>
      </Center>
   );
};

export default AuthScreen;
