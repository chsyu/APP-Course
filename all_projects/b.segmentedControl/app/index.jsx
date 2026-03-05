import React, { useState, useMemo } from 'react';
import { FlatList, View, TouchableOpacity, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import DiaryItem from '../components/DiaryItem';
import { useDiaryStore } from '../store/useDiaryStore';
import { colors } from '../utils/color';

export default function DiaryListScreen() {
  // Tab 狀態管理
  const [activeTab, setActiveTab] = useState('list');

  // 使用 Zustand store 獲取日記列表和創建函數
  const diaries = useDiaryStore((state) => state.diaries);
  const createDiary = useDiaryStore((state) => state.createDiary);
  const router = useRouter();


  // 計算統計資料
  const stats = useMemo(() => {
    const diaryCount = diaries.length;

    // 提取唯一日期（從 "2024年01月15日 08:30" 提取 "2024年01月15日"）
    const uniqueDates = new Set(
      diaries.map(diary => {
        return diary.date.split(' ')[0];
      })
    );
    const dayCount = uniqueDates.size;

    // 計算平均字數
    const totalWords = diaries.reduce((sum, diary) => sum + diary.content.length, 0);
    const avgWords = diaryCount > 0 ? Math.round(totalWords / diaryCount) : 0;

    return {
      diaryCount,
      dayCount,
      avgWords,
    };
  }, [diaries]);

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


      {/* 內容區域 */}
      <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        <View className="mx-4 mt-4 mb-2 flex-row bg-gray-200 rounded-lg p-1">
          <Pressable
            className={`flex-1 py-2 rounded-md ${activeTab === 'list' ? 'bg-white' : ''}`} // 建議先拿掉 shadow-sm 測試
            onPress={() => setActiveTab('list')}
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
              activeTab === 'list' && { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 } // 手動寫陰影更穩定
            ]}
          >
            <Text className={`text-center font-medium ${activeTab === 'list' ? 'text-gray-900' : 'text-gray-600'}`}>
              列表
            </Text>
          </Pressable>

          <Pressable
            className={`flex-1 py-2 rounded-md ${activeTab === 'stats' ? 'bg-white' : ''}`}
            onPress={() => setActiveTab('stats')}
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
              activeTab === 'stats' && { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 }
            ]}
          >
            <Text className={`text-center font-medium ${activeTab === 'stats' ? 'text-gray-900' : 'text-gray-600'}`}>
              統計
            </Text>
          </Pressable>
        </View>
        {activeTab === 'list' ? (
          <FlatList
            data={diaries}
            renderItem={renderDiaryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 16, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView
            className="px-4 pt-4 rounded-t-[40px] bg-white flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* 統計卡片 */}
            <View className="bg-white rounded-xl p-6 mb-3 shadow-sm">
              <Text className="text-xl font-bold text-gray-800 mb-6">統計資料</Text>

              <View>
                {/* 日記篇數 */}
                <View className="flex-row justify-between items-center pb-4 mb-4" style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                  <Text className="text-base text-gray-600">日記篇數</Text>
                  <Text className="text-3xl font-bold text-gray-800">{stats.diaryCount}</Text>
                </View>

                {/* 日記天數 */}
                <View className="flex-row justify-between items-center pb-4 mb-4" style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                  <Text className="text-base text-gray-600">日記天數</Text>
                  <Text className="text-3xl font-bold text-gray-800">{stats.dayCount}</Text>
                </View>

                {/* 平均字數 */}
                <View className="flex-row justify-between items-center">
                  <Text className="text-base text-gray-600">平均字數</Text>
                  <Text className="text-3xl font-bold text-gray-800">{stats.avgWords}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>

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
