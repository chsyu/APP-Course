import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import MapScreen from "./screens/MapScreen";

export default function App() {

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <MapScreen />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
