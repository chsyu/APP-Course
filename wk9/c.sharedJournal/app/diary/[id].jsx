// app/diary/[id].jsx
import { View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import DiaryContent from '../../components/DiaryContent';
import useDiaryStore from '../../store/useDiaryStore';
import { colors } from '../../utils/color.js';

export default function Diary() {
  const { id } = useLocalSearchParams();
  const diary = useDiaryStore((state) =>
    state.diaries.find((d) => d.id === id)
  );

  if (!diary) return null;

  return (
    <View className="flex-1 p-5">
      <Stack.Screen 
        options={{ 
            title: diary.date,
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
        diaryId={diary.id}
        diaryJournalId={diary.journalId}
        diaryTitle={diary.title}
        diaryContent={diary.content}
        diaryDate={diary.date}
        diaryModifiedDate={diary.modifiedDate || ''}
      />
    </View>
  );
}

