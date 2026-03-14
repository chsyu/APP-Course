import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import useDiaryStore from "../store/useDiaryStore";

export default function DiaryContent({
  diaryId,
  diaryTitle,
  diaryContent,
  diaryDate,
}) {
  // 1. 定義狀態：日記內容與是否正在編輯
  const [title, setTitle] = useState(diaryTitle);
  const [content, setContent] = useState(diaryContent);

  // 從 Zustand store 獲取更新函數
  const updateDiary = useDiaryStore((state) => state.updateDiary);

  // 2. 實作儲存邏輯
  const handleSave = () => {
    // 調用 Zustand store 的更新函數
    if (diaryId) {
      updateDiary(diaryId, title, content);
    }
    console.log("Saved:", title, content);
  };

  return (
    <KeyboardAwareScrollView bottomOffset={50}>
      <Pressable
        onPress={Keyboard.dismiss}
        className="flex-1 min-h-[400px]"
      >
        <View className="p-6 flex-1">
          {/* 標題輸入區域 */}
          <TextInput
            className="text-2xl font-bold mb-2.5 text-gray-800 min-h-10"
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
            onBlur={handleSave}
          />
          <Text className="text-sm text-gray-500 mb-2">{diaryDate} &nbsp; 儲存</Text>

          <View className="flex-1">
            <TextInput
              className="p-5 text-lg leading-7 text-gray-800 flex-1"
              value={content}
              onChangeText={setContent}
              multiline
              scrollEnabled={false}
              autoFocus
              onBlur={handleSave}
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}