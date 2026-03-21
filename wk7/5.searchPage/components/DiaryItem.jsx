import React from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import useDiaryStore from '../store/useDiaryStore';

// 移除 img 標籤，取得純文字預覽
function getTextPreview(html) {
  const withoutImg = html.replace(/<img[^>]*>/gi, '');
  const plainText = withoutImg.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  return plainText.length > 10 ? plainText.substring(0, 10) + '...' : plainText;
}

// 從 HTML 中取得第一張圖片的 src
function getFirstImageSrc(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default function DiaryItem({ diary }) {
  const previewContent = getTextPreview(diary.content || '');
  const firstImageSrc = getFirstImageSrc(diary.content || '');
  const router = useRouter();
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);

  const handleLongPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      '刪除日記',
      `確定要刪除「${diary.title}」嗎？此操作無法復原。`,
      [
        { text: '取消', style: 'cancel' },
        { text: '刪除', style: 'destructive', onPress: () => deleteDiary(diary.id) },
      ]
    );
  };

  return (
    <Pressable
      onPress={() => {
        router.push(`/diary/${diary.id}`);
      }}
      onLongPress={handleLongPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#d1d5db' : '#ffffff',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View className="flex-row items-center">
        <View className="flex-1 min-w-0">
          {/* 標題 */}
          <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
            {diary.title}
          </Text>

          {/* 日期 */}
          <Text className="text-xs text-gray-500 mb-2">{diary.date}</Text>

          {/* 內容預覽（不含 img 標籤） */}
          <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
            {previewContent}
          </Text>
        </View>

        {/* 第一張圖片縮圖（若有）- 顯示在最右邊，高度與 DiaryItem 一致 */}
        {firstImageSrc ? (
          <Image
            source={{ uri: firstImageSrc }}
            className="rounded-lg ml-3 h-20 aspect-[4/5] self-center"
            resizeMode="cover"
          />
        ) : null}
      </View>
    </Pressable>
  );
}
