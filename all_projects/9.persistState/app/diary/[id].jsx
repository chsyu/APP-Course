// app/diary/[id].jsx
import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import DiaryContent from '../../components/DiaryContent';
import { colors } from '../../utils/color';

export default function Diary() {
  const { id, title, date, content, modifiedDate, photoUri } = useLocalSearchParams();

  return (
    <View className="flex-1 p-5">
      <Stack.Screen 
        options={{ 
            title: date,
            headerStyle: {
              backgroundColor: colors.primary, // header 背景色與 Stack 內容區域一致（gray-100）
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
        diaryModifiedDate={modifiedDate}
        diaryPhotoUri={photoUri}
      />
    </View>
  );
}

