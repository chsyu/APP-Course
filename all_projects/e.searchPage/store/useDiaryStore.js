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
    title: '週末閱讀時光',
    content: '週末在家讀了一本好書，內容關於時間管理。學到了很多實用的技巧，準備開始實踐。',
    date: '2024年01月12日 15:45',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '5',
    title: '運動日記',
    content: '今天去健身房運動了一個小時，雖然很累但感覺身體變得更健康了。要堅持下去！',
    date: '2024年01月11日 18:00',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '6',
    title: '工作上的突破',
    content: '今天完成了一個重要的專案，得到了主管的肯定。感覺自己的努力沒有白費，很開心。',
    date: '2024年01月10日 17:30',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '7',
    title: '咖啡時光',
    content: '下午去了一家新開的咖啡店，環境很舒適，咖啡也很好喝。適合一個人靜靜地思考。',
    date: '2024年01月09日 16:15',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '8',
    title: '學習新技能',
    content: '開始學習攝影，今天練習了構圖技巧。雖然還不熟練，但已經能拍出一些不錯的照片了。',
    date: '2024年01月08日 10:00',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '9',
    title: '雨天的心情',
    content: '今天下了一整天的雨，雖然不能出門，但在家裡聽音樂、看電影也很愜意。',
    date: '2024年01月07日 14:20',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '10',
    title: '美食探索',
    content: '嘗試了一家新的餐廳，點了招牌菜。味道很不錯，下次還要再來試試其他菜色。',
    date: '2024年01月06日 19:30',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '11',
    title: '早起的習慣',
    content: '今天嘗試早起，六點就起床了。感覺一天的時間變長了，可以做更多事情。',
    date: '2024年01月05日 06:00',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '12',
    title: '音樂會回憶',
    content: '晚上去聽了場音樂會，演奏的曲目都很經典。現場的氛圍很棒，讓人完全沉浸在音樂中。',
    date: '2024年01月04日 20:00',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '13',
    title: '整理房間',
    content: '花了一整個下午整理房間，丟掉了很多不需要的東西。房間變整齊了，心情也跟著變好。',
    date: '2024年01月03日 13:45',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '14',
    title: '看電影',
    content: '和朋友一起去看了一部新上映的電影，劇情很精彩，特效也很震撼。討論了很久才回家。',
    date: '2024年01月02日 21:15',
    modifiedDate: null,
    photoUri: null,
  },
  {
    id: '15',
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

      // 刪除日記
      deleteDiary: (id) => set((state) => ({
        diaries: state.diaries.filter(diary => diary.id !== id)
      })),
    }),
    {
      name: 'diary-storage-new',
      storage: createJSONStorage(() => AsyncStorage),
      // 只持久化 diaries 陣列
      partialize: (state) => ({ diaries: state.diaries }),
    }
  )
);

