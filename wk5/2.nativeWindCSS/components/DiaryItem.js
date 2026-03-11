import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from 'expo-router';

export default function DiaryItem({ diary }) {
  // 截取內容的前50個字作為預覽
  const previewContent =
    diary.content.length > 50
      ? diary.content.substring(0, 50) + "..."
      : diary.content;
  const router = useRouter();
  return (
    <Pressable
    onPress={() => {
      router.push({
        pathname: `/diary/${diary.id}`,
          params: { 
            title: diary.title, 
            date: diary.date, 
            content: diary.content,
            modifiedDate: diary.modifiedDate || ''
          }
      });
    }}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#d1d5db' : '#ffffff',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
          {diary.title}
        </Text>

        <Text className="text-xs text-gray-500 mb-2">{diary.date}</Text>

        <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
          {previewContent}
        </Text>
      </View>
    </Pressable>
  );
}
