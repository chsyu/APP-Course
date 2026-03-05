import React, { useRef, useMemo } from "react";
import { View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { useDiaryStore } from '../store/useDiaryStore';
import { htmlToText, extractImagesFromHTML } from '../utils/htmlHelper';

export function DiaryItem({ diary, currentSwipeableRef }) {
  const router = useRouter();
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);
  const swipeableRef = useRef(null);

  
  // 刪除按鈕動畫相關
  const deleteButtonOpacity = useSharedValue(0);
  const deleteButtonTranslateX = useSharedValue(20);

  // 刪除按鈕動畫樣式
  const deleteButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: deleteButtonOpacity.value,
    transform: [{ translateX: deleteButtonTranslateX.value }],
  }));


  // 從 HTML 中提取純文字作為預覽
  const previewContent = useMemo(() => {
    const text = htmlToText(diary.content || '');
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  }, [diary.content]);

  // 從 HTML 中提取第一張圖片（用於縮圖顯示）
  const firstImage = useMemo(() => {
    const images = extractImagesFromHTML(diary.content || '');
    return images.length > 0 ? images[0] : null;
  }, [diary.content]);

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
            // 刪除日記（圖片已嵌入 HTML，無需單獨處理）
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

    // 觸發刪除按鈕淡入和滑入動畫
    deleteButtonOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    deleteButtonTranslateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });    

  };

  const handleSwipeableClose = () => {
    // 如果關閉的是當前打開的 Swipeable，清除引用
    if (currentSwipeableRef.current === swipeableRef.current) {
      currentSwipeableRef.current = null;
    }

    // 觸發刪除按鈕淡出動畫
    deleteButtonOpacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    deleteButtonTranslateX.value = withTiming(20, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });    

  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableClose={handleSwipeableClose}
      containerStyle={{
        backgroundColor: 'transparent',
      }}
    >
      <Pressable
        onPress={() => {
          router.push({
            pathname: `/diary/${diary.id}`,
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
          
          {/* 照片縮圖 - 從 HTML 中提取的第一張圖片 */}
          {firstImage && (
            <View style={{ width: 80, height: 80 }}>
              <Image
                source={{ uri: firstImage }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
                contentFit="cover"
                transition={200}
              />
            </View>
          )}
        </View>
      </Pressable>
    </Swipeable>
  );
}
