import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import DiaryItem from '../../components/DiaryItem';
import FabButton from '../../components/FabButton';
import useDiaryStore from '../../store/useDiaryStore';
import { useAnimatedThemeBackground } from '../../hooks/useTheme';

export default function DiaryListScreen() {
  const diaries = useDiaryStore((state) => state.diaries);
  const createDiary = useDiaryStore((state) => state.createDiary);
  const router = useRouter();
  const contentStyle = useAnimatedThemeBackground('content');

  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  const handleCreateDiary = async () => {
    const newDiary = await createDiary();
    router.push(`/diary/${newDiary.id}`);
  };

  return (
    <Animated.View className="flex-1" style={contentStyle}>
      <FlatList
        data={diaries}
        renderItem={renderDiaryItem}
        keyExtractor={(item) => item.id}
        extraData={diaries}
        contentContainerClassName="p-4 pb-[100px]"
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />
      <FabButton onPress={handleCreateDiary} />
    </Animated.View>
  );
}
