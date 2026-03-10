// app/diary/[id].jsx
import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import DiaryContent from '../../components/DiaryContent';

export default function Diary() {
  const { id, title, date, content } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Stack.Screen 
        options={{ 
            title: date,
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

