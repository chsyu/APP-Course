import React from 'react';
import { FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import DiaryItem from '../../components/DiaryItem';
import FabButton from '../../components/FabButton';
import useDiaryStore from '../../store/useDiaryStore';

export default function DiaryListScreen() {
  const diaries = useDiaryStore((state) => state.diaries);
  const createDiary = useDiaryStore((state) => state.createDiary);
  const router = useRouter();

  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  const handleCreateDiary = async () => {
    const newDiary = await createDiary();
    router.push(`/diary/${newDiary.id}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={diaries}
        renderItem={renderDiaryItem}
        keyExtractor={(item) => item.id}
        extraData={diaries}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      />
      <FabButton onPress={handleCreateDiary} />
    </View>
  );
}
