import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import DiaryItem from '../components/DiaryItem';

// 初始的日記資料（硬編碼，供示範使用）
const initialDiaries = [
  {
    id: '1',
    title: '美好的早晨',
    content: '今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。',
    date: '2024年01月15日 08:30',
  },
  {
    id: '2',
    title: '學習 React Native',
    content: '今天開始學習 React Native，感覺很有趣。學會了如何使用 FlatList 來顯示列表資料。',
    date: '2024年01月14日 14:20',
  },
  {
    id: '3',
    title: '和朋友聚餐',
    content: '晚上和朋友一起去吃火鍋，聊了很多有趣的話題。好久沒有這麼開心了！',
    date: '2024年01月13日 19:00',
  },
  {
    id: '4',
    title: '新的開始',
    content: '今天是新的一年的開始，對未來充滿了期待。希望今年能夠達成自己的目標。',
    date: '2024年01月01日 00:00',
  },
];

export default function DiaryListScreen() {
  // 使用 useState 來管理日記列表的狀態
  const [diaries] = useState(initialDiaries);

  // FlatList 的 renderItem 函數
  const renderDiaryItem = ({ item }) => {
    return <DiaryItem diary={item} />;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: `我的日記`,
          headerStyle: {
            backgroundColor: "#e5e5e5", // header 背景色與 Stack 內容區域一致（gray-100）
            elevation: 0, // Android 移除 shadow
            shadowOpacity: 0, // iOS 移除 shadow
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          headerShadowVisible: false, // 移除分隔線
        }} 
      />       

      {/* 日記列表 */}
      <FlatList
          data={diaries}
          renderItem={renderDiaryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          style={{           
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: '#ffffff' // FlatList 保持白色背景
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  list: {
    padding: 16,
  },
});

