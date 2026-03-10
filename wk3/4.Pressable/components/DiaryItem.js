import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function DiaryItem({ diary }) {
  // 截取內容的前10個字作為預覽
  const previewContent =
    diary.content.length > 10
      ? diary.content.substring(0, 10) + "..."
      : diary.content;

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#ddd" : "#fff", // 點擊時變灰色
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={() => {
        console.log(`${diary.title} pressed`);
      }}
    >
      {/* 標題 */}
      <Text style={styles.title} numberOfLines={1}>
        {diary.title}
      </Text>

      {/* 日期 */}
      <Text style={styles.date}>{diary.date}</Text>

      {/* 內容預覽 */}
      <Text style={styles.preview} numberOfLines={2}>
        {previewContent}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
