import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useRouter } from 'expo-router';

export function LocationDiarySheet({ visible, diaries, onClose }) {
  const router = useRouter();
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [visible]);

  const handleDiaryPress = (diaryId) => {
    router.push({
      pathname: `/diary/${diaryId}`,
    });
    onClose();
  };

  const renderDiaryItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleDiaryPress(item.id)}
        className="bg-white rounded-xl p-4 mb-3 shadow-sm"
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#d1d5db' : '#ffffff',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View className="flex-row items-start">
          <View className="flex-1 mr-3" style={{ minWidth: 0 }}>
            <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-xs text-gray-500 mb-2">{item.date}</Text>
            <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
              {item.content ? item.content.replace(/<[^>]*>/g, '').substring(0, 50) + '...' : ''}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={onClose}
      containerStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      gestureEnabled={true}
      closable={true}
      defaultOverlayOpacity={0.5}
    >
      <View className="pb-0">
        {/* 标题栏 */}
        <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800">
            {diaries.length} 篇日記
          </Text>
        </View>

        {/* 日记列表 */}
        <FlatList
          data={diaries}
          renderItem={renderDiaryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="justify-center items-center" style={{ paddingVertical: 60 }}>
              <Text className="text-base text-gray-400">沒有日記</Text>
            </View>
          }
        />
      </View>
    </ActionSheet>
  );
}

