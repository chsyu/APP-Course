import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';
import { useDiaryStore } from '../store/useDiaryStore';
import { syncDiariesToFirestore } from '../services/diaryService';

/**
 * 計算資料大小（字節）
 * @param {Array} diaries - 日記陣列
 * @returns {number} 資料大小（字節）
 */
const calculateDataSize = (diaries) => {
  if (!diaries || diaries.length === 0) return 0;
  
  // 將日記陣列轉換為 JSON 字串來計算大小
  const jsonString = JSON.stringify(diaries);
  
  // 計算 UTF-8 編碼的字節數
  // 在 React Native 中，使用 Buffer 或直接計算字串長度
  // 對於 UTF-8，大部分字符是 1 字節，中文字符是 3 字節
  let byteSize = 0;
  for (let i = 0; i < jsonString.length; i++) {
    const charCode = jsonString.charCodeAt(i);
    if (charCode < 0x80) {
      byteSize += 1; // ASCII 字符
    } else if (charCode < 0x800) {
      byteSize += 2; // 2 字節字符
    } else {
      byteSize += 3; // 3 字節字符（包括中文）
    }
  }
  return byteSize;
};

/**
 * 格式化資料大小
 * @param {number} bytes - 字節數
 * @returns {string} 格式化後的大小字串
 */
const formatDataSize = (bytes) => {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function SyncScreen() {
  const router = useRouter();
  const { user, isAuthenticated, updateUserProfile } = useUserStore();
  const { diaries } = useDiaryStore();
  const [isSyncing, setIsSyncing] = useState(false);

  // 計算資料大小
  const dataSize = useMemo(() => {
    return calculateDataSize(diaries);
  }, [diaries]);

  const handleSyncPress = async () => {
    // 檢查用戶是否已登入
    if (!isAuthenticated || !user?.uid) {
      Alert.alert('提示', '請先登入才能同步日記');
      router.push('/login');
      return;
    }

    // 檢查是否有日記需要同步
    if (!diaries || diaries.length === 0) {
      Alert.alert('提示', '目前沒有日記需要同步');
      return;
    }

    setIsSyncing(true);

    try {
      // 同步日記到 Firestore
      const result = await syncDiariesToFirestore(user.uid, diaries);

      if (result.success) {
        // 更新用戶的 updatedAt 時間
        await updateUserProfile({
          updatedAt: new Date().toISOString(),
        });

        const message = result.updatedCount > 0 || result.syncedCount > 0
          ? `同步完成：新建 ${result.syncedCount} 篇，更新 ${result.updatedCount} 篇${result.skippedCount > 0 ? `，跳過 ${result.skippedCount} 篇（雲端已是最新）` : ''}`
          : `所有日記已是最新狀態（跳過 ${result.skippedCount} 篇）`;
        
        Alert.alert(
          '同步成功',
          message,
          [{ text: '確定' }]
        );
      } else {
        Alert.alert(
          '同步失敗',
          result.error || '同步時發生錯誤，請稍後再試',
          [{ text: '確定' }]
        );
      }
    } catch (error) {
      console.error('同步過程發生錯誤:', error);
      Alert.alert(
        '同步失敗',
        error.message || '同步時發生錯誤，請稍後再試',
        [{ text: '確定' }]
      );
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#F2F2F7' }}>
      <Stack.Screen
        options={{
          title: '同步',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 同步資訊區域 */}
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-4 border-b border-gray-100">
            <Text className="text-sm text-gray-500 mb-1">上次同步時間</Text>
            <Text className="text-base text-gray-900">
              {user?.updatedAt 
                ? new Date(user.updatedAt).toLocaleString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '尚未同步'}
            </Text>
          </View>
          
          <View className="px-4 py-4">
            <Text className="text-sm text-gray-500 mb-1">資料量大小</Text>
            <Text className="text-base text-gray-900">
              {formatDataSize(dataSize)}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              {diaries?.length || 0} 篇日記
            </Text>
          </View>
        </View>

        {/* 同步按鈕 */}
        <View className="mx-4">
          <Pressable
            onPress={handleSyncPress}
            disabled={isSyncing || !isAuthenticated}
            className="bg-gray-600 rounded-lg flex-row items-center justify-center py-4"
            style={({ pressed }) => ({
              opacity: (isSyncing || !isAuthenticated || pressed) ? 0.7 : 1,
              backgroundColor: (isSyncing || !isAuthenticated) ? '#9CA3AF' : '#4B5563',
            })}
          >
            {isSyncing && (
              <ActivityIndicator 
                size="small" 
                color="#FFFFFF" 
                style={{ marginRight: 8 }}
              />
            )}
            <Text className="text-base font-medium text-white">
              {isSyncing 
                ? '同步中...' 
                : !isAuthenticated 
                ? '請先登入' 
                : '同步到雲端'}
            </Text>
          </Pressable>
        </View>

        {/* 提示資訊 */}
        {!isAuthenticated && (
          <View className="mx-4 mt-4 bg-yellow-50 rounded-lg px-4 py-3 border border-yellow-200">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#F59E0B" style={{ marginRight: 8, marginTop: 2 }} />
              <Text className="text-sm text-yellow-800 flex-1">
                請先登入帳號才能同步日記到雲端
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

