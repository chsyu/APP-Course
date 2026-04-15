import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DiaryItem from '../components/DiaryItem';
import useDiaryStore from '../store/useDiaryStore';
import { colors } from '../utils/color';
import { getPlainText } from '../utils/htmlUtils';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const diaries = useDiaryStore((state) => state.diaries);
  const insets = useSafeAreaInsets();

  // 搜尋邏輯（content 為 HTML，須先 strip 標籤再比對）
  const filteredDiaries = useMemo(() => {
    if (!searchText.trim()) return [];
    const lowerSearch = searchText.toLowerCase();
    return diaries.filter(diary =>
      diary.title.toLowerCase().includes(lowerSearch) ||
      getPlainText(diary.content).toLowerCase().includes(lowerSearch)
    );
  }, [diaries, searchText]);

  const handleClear = () => {
    setSearchText('');
  };

  const handleCancel = () => {
    router.back();
  };

  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 搜尋輸入區域 */}
      <View
        className="px-4 pb-3 bg-white"
        style={{
          backgroundColor: colors.primary,
          paddingTop: Math.max(insets.top, 16),
        }}
      >
        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center bg-white rounded-lg px-3 py-2 mr-3">
            <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="搜尋日記..."
              className="flex-1 text-base"
              autoFocus
              style={{ padding: 0 }}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                style={{ marginLeft: 8 }}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
            <Text className="text-base text-gray-700">取消</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 搜尋結果區域 */}
      <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden mt-4">
        {searchText.trim() ? (
          <>
            <View className="px-4 pt-4 pb-2">
              <Text className="text-sm text-gray-600">
                找到 {filteredDiaries.length} 篇日記
              </Text>
            </View>

            <FlatList
              data={filteredDiaries}
              renderItem={renderDiaryItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100, paddingTop: 8, paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="items-center justify-center py-20">
                  <Text className="text-gray-400 text-base">沒有找到相關日記</Text>
                </View>
              }
            />
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 text-base">請輸入搜尋關鍵字</Text>
          </View>
        )}
      </View>
    </View>
  );
}
