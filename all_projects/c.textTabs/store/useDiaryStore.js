import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDiaryDate } from '../utils/dateFormatter';

// 初始的日記資料（硬編碼，供示範使用）
const initialDiaries = [
  {
    id: '1',
    title: '美好的早晨',
    content: '今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。',
    date: '2024年01月15日 08:30',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '2',
    title: '學習 React Native',
    content: '今天開始學習 React Native，感覺很有趣。學會了如何使用 FlatList 來顯示列表資料。',
    date: '2024年01月14日 14:20',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '3',
    title: '和朋友聚餐',
    content: '晚上和朋友一起去吃火鍋，聊了很多有趣的話題。好久沒有這麼開心了！',
    date: '2024年01月13日 19:00',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '4',
    title: '新的開始',
    content: '今天是新的一年的開始，對未來充滿了期待。希望今年能夠達成自己的目標。',
    date: '2024年01月01日 00:00',
    modifiedDate: null,
    photoUri: null,
  },
];

// 創建 Zustand store
export const useDiaryStore = create(
  persist(
    (set) => ({
      // State
      diaries: initialDiaries,

      // Actions
      updateDiary: (id, title, content, photoUri = null) => set((state) => ({
        diaries: state.diaries.map(diary => 
          diary.id === id 
            ? { ...diary, title, content, photoUri, modifiedDate: formatDiaryDate() } 
            : diary
        )
      })),

      // 清除日記的照片 URI（用於錯誤處理）
      clearDiaryPhoto: (id) => set((state) => ({
        diaries: state.diaries.map(diary => 
          diary.id === id 
            ? { ...diary, photoUri: null } 
            : diary
        )
      })),

      // 創建新日記
      createDiary: (title = '新日記', content = '') => {
        const newId = String(Date.now()); // 使用時間戳作為 ID
        const newDiary = {
          id: newId,
          title,
          content,
          date: formatDiaryDate(),
          modifiedDate: null,
          photoUri: null,
        };
        set((state) => ({
          diaries: [newDiary, ...state.diaries], // 新日記放在最前面
        }));
        return newDiary; // 返回新日記對象，用於導航
      },
    }),
    {
      name: 'diary-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // 只持久化 diaries 陣列
      partialize: (state) => ({ diaries: state.diaries }),
    }
  )
);

