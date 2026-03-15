import React from 'react';
import { FlatList, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import DiaryItem from '../components/DiaryItem';
import FabButton from '../components/FabButton';
import useDiaryStore from '../store/useDiaryStore';
import { colors } from '../utils/color';

export default function DiaryListScreen() {
  // 使用 Zustand store 獲取日記列表
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
            backgroundColor: colors.primary,
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
        extraData={diaries}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#ffffff' // FlatList 保持白色背景
        }}
      />
      <FabButton onPress={handleCreateDiary} />
    </View>
  );
}

