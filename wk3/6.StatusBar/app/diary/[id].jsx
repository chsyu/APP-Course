// app/diary/[id].jsx
import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function Diary() {
  const { title,date, content } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Stack.Screen options={{ 
          title: date,
        }} 
      />
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 24 }}>
        {content}
      </Text>
    </View>
  );
}

