import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Ionicons } from '@expo/vector-icons';
import {
  RichText,
  useEditorBridge,
  useBridgeState,
  DEFAULT_TOOLBAR_ITEMS,
} from '@10play/tentap-editor';
import useDiaryStore from '../store/useDiaryStore';
import { pickImage } from '../utils/photoHandler';
import {
  enhanceDiaryDraft,
  formatDiaryEnhanceError,
  isDiaryEnhanceAvailable,
} from '../services/diaryEnhanceService';
import { plainTextToDiaryHtml } from '../utils/htmlText';
import DiaryEnhancePreviewModal from './DiaryEnhancePreviewModal';

export default function DiaryContent({
  diaryId,
  diaryTitle,
  diaryContent,
  diaryDate,
  diaryModifiedDate,
  diaryWeather,
}) {
  const [title, setTitle] = useState(diaryTitle);
  const [enhanceAvailable, setEnhanceAvailable] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const updateDiary = useDiaryStore((state) => state.updateDiary);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: diaryContent,
    theme: { webview: { backgroundColor: 'transparent' } },
  });

  const editorState = useBridgeState(editor);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setEnhanceAvailable(isDiaryEnhanceAvailable());
    }
  }, []);

  const handleSave = async () => {
    if (!editor) return;
    editor.blur();
    Keyboard.dismiss();
    const content = await editor.getHTML();
    if (diaryId)
      updateDiary(diaryId, title, content);
  };

  const handleInsertImage = async () => {
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        editor?.setImage(imageUri);
      }
    } catch {
      Alert.alert('錯誤', '插入圖片失敗');
    }
  };

  const handleEnhance = async () => {
    if (!editor || previewLoading) return;

    try {
      const draft = (await editor.getText()).trim();
      if (!draft) {
        Alert.alert('提示', '請先輸入日記內容');
        return;
      }

      setOriginalText(draft);
      setEnhancedText('');
      setPreviewVisible(true);
      setPreviewLoading(true);

      const result = await enhanceDiaryDraft(draft);
      setEnhancedText(result);
    } catch (error) {
      setPreviewVisible(false);
      Alert.alert('潤飾失敗', formatDiaryEnhanceError(error));
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleAcceptEnhance = () => {
    if (!editor || !enhancedText) return;
    editor.setContent(plainTextToDiaryHtml(enhancedText));
    setPreviewVisible(false);
    setOriginalText('');
    setEnhancedText('');
  };

  const handleCancelEnhance = () => {
    if (previewLoading) return;
    setPreviewVisible(false);
    setOriginalText('');
    setEnhancedText('');
  };

  const toolbarItems = [
    DEFAULT_TOOLBAR_ITEMS[0], // bold
    DEFAULT_TOOLBAR_ITEMS[1], // italic
    {
      onPress: () => () => handleInsertImage(),
      active: () => false,
      pickImageIcon: 'image-outline',
    },
    DEFAULT_TOOLBAR_ITEMS[9], // orderedList
    DEFAULT_TOOLBAR_ITEMS[10], // bulletList
  ];

  const toolbarArgs = {
    editor,
    editorState,
    setToolbarContext: () => { },
    toolbarContext: 0,
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between bg-gray-100 border-b border-gray-200 h-11 min-h-[44px] px-2 z-[1000]">
        <View className="flex-row items-center gap-1">
          {toolbarItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`px-2.5 py-2 rounded ${item.active(toolbarArgs) ? 'bg-gray-200' : ''}`}
              onPress={item.onPress(toolbarArgs)}
            >
              <View className="items-center justify-center">
                {item.pickImageIcon ? (
                  <Ionicons name={item.pickImageIcon} size={22} color="gray" />
                ) : (
                  <Image
                    source={item.image(toolbarArgs)}
                    style={{ width: 22, height: 22 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
          {enhanceAvailable ? (
            <TouchableOpacity
              className="px-2.5 py-2 rounded flex-row items-center gap-1"
              onPress={handleEnhance}
              disabled={previewLoading}
            >
              {previewLoading ? (
                <ActivityIndicator size="small" color="#6B7280" />
              ) : (
                <Ionicons name="sparkles-outline" size={22} color="gray" />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          className="px-3 py-2"
          onPress={handleSave}
        >
          <Text className="text-base text-gray-700 font-medium">完成</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView bottomOffset={40}>
        <View className="p-6 flex-1 bg-gray-100">
          <TextInput
            className="text-2xl font-bold mb-2 text-gray-800"
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
          />

          {diaryWeather?.condition ? (
            <Text className="text-sm text-gray-600 mb-2">
              {diaryWeather.condition} · {diaryWeather.value}°C
            </Text>
          ) : null}

          <View className="mb-4">
            {diaryModifiedDate === '' ? (
              <Text className="text-sm text-gray-500">
                建立日期：{diaryDate}
              </Text>
            ) : (
              <Text className="text-sm text-gray-500">
                修改日期：{diaryModifiedDate}
              </Text>
            )}
          </View>

          <View className="flex-1 min-h-[500px]">
            <RichText editor={editor} className="flex-1 bg-transparent" />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <DiaryEnhancePreviewModal
        visible={previewVisible}
        originalText={originalText}
        enhancedText={enhancedText}
        loading={previewLoading}
        onAccept={handleAcceptEnhance}
        onCancel={handleCancelEnhance}
      />
    </View>
  );
}
