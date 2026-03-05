import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import DiaryItem from '../components/DiaryItem';
import { useDiaryStore } from '../store/useDiaryStore';

export default function DiaryListScreen() {
  // 使用 Zustand store 獲取日記列表
  const diaries = useDiaryStore((state) => state.diaries);

  // FlatList 的 renderItem 函數
  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen 
        options={{ 
          title: `我的日記`,
        }} 
      />      

      {/* 日記列表 */}
      <FlatList
        data={diaries}
        renderItem={renderDiaryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

