import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function GestureCircle({
  size = 100,
  color = "gray",
  icon = "account-plus",
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateXOLD = useSharedValue(0);
  const translateYOLD = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX + translateXOLD.value;
      translateY.value = event.translationY + translateYOLD.value;
    },
    onEnd: (event) => {
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
      translateXOLD.value = translateX.value;
      translateYOLD.value = translateY.value;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            backgroundColor: color,
            borderRadius: size,
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          animatedStyles,
        ]}
      >
        <MaterialCommunityIcons 
         name={icon} color="white" size={size * 0.6} />
      </Animated.View>
    </PanGestureHandler>
  );
}
