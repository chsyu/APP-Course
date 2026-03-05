// app/diary/[id].jsx
import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useMemo } from "react";
import DiaryContent from '../../components/DiaryContent';
import { colors } from '../../utils/color';
import { useDiaryStore } from '../../store/useDiaryStore';

export default function Diary() {
  const { id } = useLocalSearchParams();
  const getDiaryById = useDiaryStore((state) => state.getDiaryById);
  
  // 從 store 獲取日記數據
  const diary = useMemo(() => {
    return getDiaryById(id);
  }, [id, getDiaryById]);

  // 如果日記不存在，顯示錯誤或返回列表頁
  if (!diary) {
    return (
      <View className="flex-1 p-5 justify-center items-center">
        <Stack.Screen 
          options={{ 
            title: '日記不存在',
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerBackButtonDisplayMode: 'minimal',
          }} 
        />
        <Text className="text-gray-600 mb-4">找不到這篇日記</Text>
      </View>
    );
  }

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
        diaryTitle={diary.title}
        diaryContent={diary.content} 
        diaryDate={diary.date}
        diaryLastModifiedTimestamp={diary.lastModifiedTimestamp || null}
      />
    </View>
  );
}

