// app/diary/[id].jsx
import { View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import DiaryContent from '../../components/DiaryContent';

export default function Diary() {
  const { id, title, date, content } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Stack.Screen
        options={{
          title: date,
          headerStyle: {
            backgroundColor: "e5e5e5",
            elevation: 0, // Android 移除 shadow
            shadowOpacity: 0, // iOS 移除 shadow
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <DiaryContent
        diaryId={id}
        diaryTitle={title}
        diaryContent={content}
        diaryDate={date}
      />
    </View>
  );
}

