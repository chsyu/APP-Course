import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import ThemedText from './ThemedText';

export default function DiaryEnhancePreviewModal({
  visible,
  originalText,
  enhancedText,
  loading,
  onAccept,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 justify-end bg-black/40"
        onPress={loading ? undefined : onCancel}
      >
        <Pressable
          className="max-h-[85%] rounded-t-2xl bg-gray-100 px-5 pt-5 pb-8"
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedText className="text-xl font-bold mb-1">潤飾預覽</ThemedText>
          <ThemedText colorKey="textSecondary" className="text-sm mb-4">
            確認內容後再套用至日記
          </ThemedText>

          {loading ? (
            <View className="py-16 items-center justify-center">
              <ActivityIndicator size="large" color="#6B7280" />
              <ThemedText colorKey="textSecondary" className="mt-4 text-sm">
                Apple Intelligence 潤飾中…
              </ThemedText>
            </View>
          ) : (
            <ScrollView className="max-h-80 mb-4" showsVerticalScrollIndicator>
              {originalText ? (
                <View className="mb-4">
                  <ThemedText colorKey="textMuted" className="text-xs mb-1">
                    原文
                  </ThemedText>
                  <ThemedText colorKey="textSecondary" className="text-sm leading-5">
                    {originalText}
                  </ThemedText>
                </View>
              ) : null}
              <View>
                <ThemedText colorKey="textMuted" className="text-xs mb-1">
                  潤飾後
                </ThemedText>
                <ThemedText className="text-base leading-6">
                  {enhancedText || '（無內容）'}
                </ThemedText>
              </View>
            </ScrollView>
          )}

          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-gray-200 items-center"
              onPress={onCancel}
              disabled={loading}
            >
              <ThemedText className="font-medium">取消</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-gray-800 items-center"
              onPress={onAccept}
              disabled={loading || !enhancedText}
            >
              <ThemedText className="font-medium text-white">套用</ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
