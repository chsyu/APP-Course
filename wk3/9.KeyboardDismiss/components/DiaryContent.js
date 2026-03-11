import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

export default function DiaryContent({
  diaryId,
  diaryTitle,
  diaryContent,
  diaryDate,
}) {
  // 1. 定義狀態：日記內容與是否正在編輯
  const [title, setTitle] = useState(diaryTitle);
  const [content, setContent] = useState(diaryContent);

  // 2. 實作儲存邏輯
  const handleSave = () => {
    console.log("Saved:", title, content);
  };

  return (
      <Pressable 
        onPress={Keyboard.dismiss}
        style={{flex: 1}}
      >
        <View style={styles.inner}>
          {/* 標題輸入區域 */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
            onBlur={handleSave}
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              minHeight: 40,
            }}
          />
          <Text style={styles.label}>{diaryDate} &nbsp; 儲存</Text>

          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={setContent}
              multiline
              autoFocus // 進入編輯模式時自動彈出鍵盤
              onBlur={handleSave} // 點擊其他地方或鍵盤收起時自動儲存
            />
          </View>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: '#f9f9f9',
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  previewContainer: {
    //  backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    minHeight: 200,
    // 陰影效果
  },
  previewText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
  },
  editHint: {
    marginTop: 20,
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
  },
  editContainer: {
    flex: 1,
  },
  input: {
    //  backgroundColor: '#fff',
    padding: 20,
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    flex: 1,
    textAlignVertical: "top", // 確保 Android 從頂部開始輸入
  },
});
