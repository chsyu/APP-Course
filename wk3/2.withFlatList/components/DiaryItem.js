import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DiaryItem({ diary }) {
  // 截取內容的前10個字作為預覽
  const previewContent =
    diary.content.length > 20
      ? diary.content.substring(0, 20) + "..."
      : diary.content;

  return (
    <View
      style={styles.container}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
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
  },
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
