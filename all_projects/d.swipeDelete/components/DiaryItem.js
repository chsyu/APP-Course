import React, { useRef } from "react";
import { View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import { useDiaryStore } from '../store/useDiaryStore';
import { deleteLocalImage } from '../utils/photoHandler';

export function DiaryItem({ diary, currentSwipeableRef }) {
  // 截取內容的前50個字作為預覽
  const previewContent =
    diary.content.length > 50
      ? diary.content.substring(0, 50) + "..."
      : diary.content;
  const router = useRouter();
  const clearDiaryPhoto = useDiaryStore((state) => state.clearDiaryPhoto);
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);
  const errorHandledRef = useRef(false);
  const swipeableRef = useRef(null);

  // 處理照片載入錯誤
  const handleImageError = () => {
    if (!errorHandledRef.current && diary.photoUri) {
      errorHandledRef.current = true;
      // 清除無效的照片 URI
      clearDiaryPhoto(diary.id);
    }
  };

  // 處理刪除日記
  const handleDelete = async () => {
    Alert.alert(
      '刪除日記',
      `確定要刪除「${diary.title}」嗎？此操作無法復原。`,
      [
        {
          text: '取消',
          style: 'cancel',
          onPress: () => {
            // 關閉滑動選單
            swipeableRef.current?.close();
          },
        },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            // 刪除照片（如果有的話）
            if (diary.photoUri) {
              await deleteLocalImage(diary.photoUri);
            }
            // 刪除日記
            deleteDiary(diary.id);
          },
        },
      ]
    );
  };

  // 渲染右側刪除按鈕
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: '#ef4444',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          borderRadius: 12,
          marginBottom: 12,
        }}
        activeOpacity={0.8}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          刪除
        </Text>
      </TouchableOpacity>
    );
  };

  // 處理 Swipeable 打開/關閉
  const handleSwipeableOpen = () => {
    // 如果之前有打開的 Swipeable，先關閉它
    if (currentSwipeableRef.current && currentSwipeableRef.current !== swipeableRef.current) {
      currentSwipeableRef.current.close();
    }
    // 更新當前打開的 Swipeable
    currentSwipeableRef.current = swipeableRef.current;
  };

  const handleSwipeableClose = () => {
    // 如果關閉的是當前打開的 Swipeable，清除引用
    if (currentSwipeableRef.current === swipeableRef.current) {
      currentSwipeableRef.current = null;
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableClose={handleSwipeableClose}
    >
      <Pressable
        onPress={() => {
          router.push({
            pathname: `/diary/${diary.id}`,
            params: { 
              title: diary.title, 
              date: diary.date, 
              content: diary.content,
              modifiedDate: diary.modifiedDate || '',
              photoUri: diary.photoUri || ''
            }
          });
        }}
        className="bg-white rounded-xl p-4 mb-3 shadow-sm"
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#d1d5db' : '#ffffff',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View className="flex-row items-start">
          <View className="flex-1 mr-3" style={{ minWidth: 0 }}>
            {/* 標題 */}
            <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
              {diary.title}
            </Text>

            {/* 日期 */}
            <Text className="text-xs text-gray-500 mb-2">{diary.date}</Text>

            {/* 內容預覽 */}
            <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
              {previewContent}
            </Text>
          </View>
          
          {/* 照片縮圖 */}
          {diary.photoUri && (
            <View style={{ width: 80, height: 80 }}>
              <Image
                source={{ uri: diary.photoUri }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
                contentFit="cover"
                transition={200}
                onError={handleImageError}
              />
            </View>
          )}
        </View>
      </Pressable>
    </Swipeable>
  );
}
