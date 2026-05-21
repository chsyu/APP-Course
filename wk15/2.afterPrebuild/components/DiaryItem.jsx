import React from 'react';
import { View, Pressable, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';
import useDiaryStore from '../store/useDiaryStore';
import { useAnimatedThemeBackground } from '../hooks/useTheme';
import ThemedText from './ThemedText';

function getTextPreview(html) {
  const plainText = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  return plainText.length > 10 ? plainText.substring(0, 10) + '...' : plainText;
}

function getFirstImageSrc(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default function DiaryItem({ diary }) {
  const previewContent = getTextPreview(diary.content || '');
  const firstImageSrc = getFirstImageSrc(diary.content || '');
  const router = useRouter();
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);
  const surfaceStyle = useAnimatedThemeBackground('surface');

  const handleLongPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      '刪除日記',
      `確定要刪除「${diary.title}」嗎？此操作無法復原。`,
      [
        { text: '取消', style: 'cancel' },
        { text: '刪除', style: 'destructive', onPress: () => deleteDiary(diary.id) },
      ],
    );
  };

  return (
    <Pressable
      onPress={() => router.push(`/diary/${diary.id}`)}
      onLongPress={handleLongPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Animated.View className="rounded-xl p-4 mb-3 shadow-sm" style={surfaceStyle}>
        <View className="flex-row items-center">
          <View className="flex-1 min-w-0">
            <ThemedText className="text-lg font-bold mb-2" numberOfLines={1}>
              {diary.title}
            </ThemedText>
            <ThemedText colorKey="textMuted" className="text-xs mb-2">
              {diary.date}
            </ThemedText>
            <ThemedText colorKey="textSecondary" className="text-sm leading-5" numberOfLines={2}>
              {previewContent}
            </ThemedText>
          </View>
          {firstImageSrc ? (
            <Image
              source={{ uri: firstImageSrc }}
              className="rounded-lg ml-3 h-20 aspect-[4/5] self-center"
              resizeMode="cover"
            />
          ) : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}
