import { StatusBar } from "expo-status-bar";
import { Text, ScrollView, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useUbikeInfo, useWeatherInfo } from "./src/tanstack-query";

export default function Screen() {
  const ubike = useUbikeInfo();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["weatherInfo"]);
  const weather = useWeatherInfo();
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", marginTop: 70, fontSize: 30 }}>
        Ubike Info
      </Text>
      <Text style={{ padding: 10 }}>
        {ubike.isSuccess && JSON.stringify(ubike.data[0])}
      </Text>
      <Text style={{ textAlign: "center", marginTop: 10, fontSize: 30 }}>
        Weather Info
      </Text>
      <Text style={{ padding: 10 }}>
        {weather.isSuccess && JSON.stringify(weather.data)}
      </Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}
