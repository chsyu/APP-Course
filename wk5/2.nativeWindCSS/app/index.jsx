import React from 'react';
import { FlatList, View } from 'react-native';
import { Stack } from 'expo-router';
import DiaryItem from '../components/DiaryItem';
import { useDiaryStore } from '../store/useDiaryStore';
import { colors } from '../utils/color';

export default function DiaryListScreen() {
  // 使用 Zustand store 獲取日記列表
  const diaries = useDiaryStore((state) => state.diaries);

  // FlatList 的 renderItem 函數
  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
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
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#ffffff' // FlatList 保持白色背景
        }}
      />
    </View>
  );
}

