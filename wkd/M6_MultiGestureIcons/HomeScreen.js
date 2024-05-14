import { Center } from "@gluestack-ui/themed";
import GestureCircle from "./components/GestureCircle";

export default function HomeScreen() {

  return (
      <Center flex={1} 
        flexDirection="row" 
        justifyContent="space-around"
      >
        <GestureCircle 
          size={80}
          color={"black"}
          icon={"account-outline"} 
        />
        <GestureCircle 
          size={80}
          color={"black"}
          icon={"cloud-outline"} 
        />
        <GestureCircle 
          size={80}
          color={"black"}
          icon={"email-box"} 
        />
      </Center>
  );
}
