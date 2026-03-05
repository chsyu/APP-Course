import React from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import DiaryItem from '../components/DiaryItem';
import { useDiaryStore } from '../store/useDiaryStore';
import { colors } from '../utils/color';

export default function DiaryListScreen() {
  // 使用 Zustand store 獲取日記列表和創建函數
  const diaries = useDiaryStore((state) => state.diaries);
  const createDiary = useDiaryStore((state) => state.createDiary);
  const router = useRouter();

  // FlatList 的 renderItem 函數
  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  // 處理創建新日記
  const handleCreateDiary = () => {
    const newDiary = createDiary();
    
    // 導航到新日記頁面
    router.push({
      pathname: `/diary/${newDiary.id}`,
      params: {
        title: newDiary.title,
        date: newDiary.date,
        content: newDiary.content,
        modifiedDate: newDiary.modifiedDate || '',
        photoUri: newDiary.photoUri || '',
      },
    });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <Stack.Screen 
        options={{ 
          title: `我的日記`,
          headerStyle: {
            backgroundColor: colors.primary, // header 背景色與 Stack 內容區域一致（gray-100）
            elevation: 0, // Android 移除 shadow
            shadowOpacity: 0, // iOS 移除 shadow
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          headerShadowVisible: false, // 移除分隔線
        }} 
      />      

        <FlatList
          data={diaries}
          renderItem={renderDiaryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="px-4 pt-4 rounded-t-[40px] bg-white"
          showsVerticalScrollIndicator={false}
        />
        
        {/* FAB */}
        <TouchableOpacity
          className="absolute right-10 bottom-20 w-16 h-16 rounded-full items-center justify-center"
          style={{ 
            backgroundColor: colors.fab,
            elevation: 8, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          }}
          onPress={handleCreateDiary}
          activeOpacity={0.8}
        >
          <Text className="text-white text-[40px] font-light leading-[40px]">+</Text>
        </TouchableOpacity>
    </View>
  );
}

