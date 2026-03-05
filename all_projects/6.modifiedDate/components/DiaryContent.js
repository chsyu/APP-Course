import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useDiaryStore } from '../store/useDiaryStore';

export default function DiaryContent({ diaryId, diaryTitle, diaryContent, diaryDate, diaryModifiedDate }) {
  // 1. 定義狀態：日記內容與是否正在編輯
  const [title, setTitle] = useState(diaryTitle);
  const [content, setContent] = useState(diaryContent);
  const [isEditing, setIsEditing] = useState(false);

  // 從 Zustand store 獲取更新函數和當前日記資料
  const updateDiary = useDiaryStore((state) => state.updateDiary);

  // 2. 實作儲存邏輯
  const handleSave = () => {
    setIsEditing(false);
    // 調用 Zustand store 的更新函數
    if (diaryId) {
      updateDiary(diaryId, title, content);
    }
    console.log('Saved:', title, content);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        <View className="p-6 flex-1">
          {/* 標題輸入區域 */}
          <TextInput
            className="text-2xl font-bold mb-2.5 text-gray-800"
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
            onBlur={handleSave}
            style={{
              minHeight: 40,
            }}
          />          
          <View className="mb-2">
            {diaryModifiedDate && (
              <Text className="text-sm text-gray-500 mt-1">
                修改日期：{diaryModifiedDate}
              </Text>
            )}
          </View>

          {isEditing ? (
            <View className="flex-1">
              <TextInput
                className="p-5 text-lg leading-7 text-gray-800"
                style={{ 
                  minHeight: Platform.OS === 'ios' ? 400 : '100%',
                  textAlignVertical: 'top',
                }}
                value={content}
                onChangeText={setContent}
                multiline
                autoFocus // 進入編輯模式時自動彈出鍵盤
                onBlur={handleSave} // 點擊其他地方或鍵盤收起時自動儲存
                scrollEnabled={true} // 啟用 TextInput 內部滾動
              />
            </View>
          ) : (
            <TouchableOpacity 
              className="p-5 rounded-xl min-h-[200px]"
              onPress={() => setIsEditing(true)}
              activeOpacity={0.7}
            >
              <Text className="text-lg leading-7 text-gray-800">{content}</Text>
              <Text className="mt-5 text-xs text-gray-400 text-center">點擊內容以編輯...</Text>
            </TouchableOpacity>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}