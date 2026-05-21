// app/diary/[id].jsx
import { View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import DiaryContent from '../../components/DiaryContent';
import useDiaryStore from '../../store/useDiaryStore';
import { useThemeColor } from '../../hooks/useTheme';
import { animatedStackHeaderOptions } from '../../navigation/animatedStackHeader';

export default function Diary() {
  const { id } = useLocalSearchParams();
  const diary = useDiaryStore((state) =>
    state.diaries.find((d) => d.id === id)
  );
  const headerIconColor = useThemeColor('headerIcon');

  if (!diary) return null;

  return (
    <View className="flex-1 p-5">
      <Stack.Screen 
        options={{ 
            ...animatedStackHeaderOptions(headerIconColor),
            title: diary.date,
            headerBackButtonDisplayMode: 'minimal',
          }} 
      />
      
      <DiaryContent 
        diaryId={diary.id}
        diaryTitle={diary.title}
        diaryContent={diary.content} 
        diaryDate={diary.date}
        diaryModifiedDate={diary.modifiedDate || ''}
        diaryWeather={diary.weatherAtCreate ?? null}
      />
    </View>
  );
}

