import { ScrollView, View, Text } from 'react-native';
import useDiaryStore from '../../store/useDiaryStore';
import { getPlainTextLength } from '../../utils/htmlUtils';

export default function DiaryStatsScreen() {
  const diaries = useDiaryStore((state) => state.diaries);

  const diaryCount = diaries.length;
  const uniqueDates = new Set(
    diaries.map((diary) => diary.date.split(' ')[0])
  );
  const dayCount = uniqueDates.size;
  const totalWords = diaries.reduce(
    (sum, diary) => sum + getPlainTextLength(diary.content),
    0
  );
  const avgWords = diaryCount > 0 ? Math.round(totalWords / diaryCount) : 0;
  const stats = { diaryCount, dayCount, avgWords };

  return (
    <ScrollView
      className="px-4 pt-4 flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-xl p-6 mb-3 shadow-sm">
        <Text className="text-xl font-bold text-gray-800 mb-6">統計資料</Text>

        <View>
          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}
          >
            <Text className="text-base text-gray-600">日記篇數</Text>
            <Text className="text-3xl font-bold text-gray-800">
              {stats.diaryCount}
            </Text>
          </View>

          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}
          >
            <Text className="text-base text-gray-600">日記天數</Text>
            <Text className="text-3xl font-bold text-gray-800">
              {stats.dayCount}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-base text-gray-600">平均字數</Text>
            <Text className="text-3xl font-bold text-gray-800">
              {stats.avgWords}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
