import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function DiaryContent({
  diaryId,
  diaryTitle,
  diaryContent,
  diaryDate,
}) {
  // 1. 定義狀態：日記內容與是否正在編輯
  const [title, setTitle] = useState(diaryTitle);
  const [content, setContent] = useState(diaryContent);

  const handleSave = () => {
    console.log("Saved:", title, content);
  };

  return (
    <KeyboardAwareScrollView bottomOffset={50}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <View style={styles.inner}>
          {/* 標題輸入區域 */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
            onBlur={handleSave}
            style={styles.titleInput}
          />
          <Text style={styles.label}>{diaryDate} &nbsp; 儲存</Text>

          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={setContent}
              multiline
              scrollEnabled={false}
              autoFocus
              onBlur={handleSave}
            />
          </View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    minHeight: 400,
  },
  inner: {
    padding: 24,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    minHeight: 40,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  editContainer: {
    minHeight: 300,
  },
  input: {
    padding: 20,
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    minHeight: 280,
    textAlignVertical: "top", // 確保 Android 從頂部開始輸入
  },
});
