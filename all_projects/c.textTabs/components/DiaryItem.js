import React, { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useDiaryStore } from '../store/useDiaryStore';

export default function DiaryItem({ diary }) {
  // 截取內容的前50個字作為預覽
  const previewContent =
    diary.content.length > 50
      ? diary.content.substring(0, 50) + "..."
      : diary.content;
  const router = useRouter();
  const clearDiaryPhoto = useDiaryStore((state) => state.clearDiaryPhoto);
  const errorHandledRef = useRef(false);

  // 處理照片載入錯誤
  const handleImageError = () => {
    if (!errorHandledRef.current && diary.photoUri) {
      errorHandledRef.current = true;
      // 清除無效的照片 URI
      clearDiaryPhoto(diary.id);
    }
  };
  return (
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
  );
}
