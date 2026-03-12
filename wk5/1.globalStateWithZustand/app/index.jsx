import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `我的日記`,
          headerStyle: {
            backgroundColor: "#e5e5e5",
            elevation: 0, // Android 移除 shadow
            shadowOpacity: 0, // iOS 移除 shadow
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          headerShadowVisible: false, // 移除分隔線
        }}
      />

      {/* 日記列表 */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  list: {
    padding: 16,
  },
});

