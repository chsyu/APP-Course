import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import useDiaryStore from '../../store/useDiaryStore';
import { getPlainTextLength } from '../../utils/htmlUtils';
import { useAnimatedThemeBackground, useThemeColor } from '../../hooks/useTheme';
import ThemedText from '../../components/ThemedText';

export default function DiaryStatsScreen() {
  const diaries = useDiaryStore((state) => state.diaries);
  const surfaceStyle = useAnimatedThemeBackground('surface');
  const borderColor = useThemeColor('border');

  const stats = useMemo(() => {
    const diaryCount = diaries.length;
    const uniqueDates = new Set(diaries.map((diary) => diary.date.split(' ')[0]));
    const dayCount = uniqueDates.size;
    const totalWords = diaries.reduce(
      (sum, diary) => sum + getPlainTextLength(diary.content),
      0,
    );
    const avgWords = diaryCount > 0 ? Math.round(totalWords / diaryCount) : 0;

    return { diaryCount, dayCount, avgWords };
  }, [diaries]);

  return (
    <ScrollView
      className="px-4 pt-4 flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View className="rounded-xl p-6 mb-3 shadow-sm" style={surfaceStyle}>
        <ThemedText className="text-xl font-bold mb-6">統計資料</ThemedText>

        <View>
          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: borderColor }}
          >
            <ThemedText colorKey="textSecondary" className="text-base">
              日記篇數
            </ThemedText>
            <ThemedText className="text-3xl font-bold">{stats.diaryCount}</ThemedText>
          </View>

          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: borderColor }}
          >
            <ThemedText colorKey="textSecondary" className="text-base">
              日記天數
            </ThemedText>
            <ThemedText className="text-3xl font-bold">{stats.dayCount}</ThemedText>
          </View>

          <View className="flex-row justify-between items-center">
            <ThemedText colorKey="textSecondary" className="text-base">
              平均字數
            </ThemedText>
            <ThemedText className="text-3xl font-bold">{stats.avgWords}</ThemedText>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
