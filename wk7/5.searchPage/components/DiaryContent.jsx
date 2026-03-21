import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import {
  RichText,
  useEditorBridge,
  useBridgeState,
  DEFAULT_TOOLBAR_ITEMS,
  Images,
} from '@10play/tentap-editor';
import useDiaryStore from '../store/useDiaryStore';
import { pickImageAndConvertToBase64 } from '../utils/photoHandler';

const PLACEHOLDER = '開始輸入您的日記...';
const EMPTY_CONTENT = '<p></p>';

// tentap-editor 無內建 image 圖示，暫用 link 圖示；可替換為自訂 require('./assets/image.png')
const IMAGE_BUTTON_ICON = Images.link;

export default function DiaryContent({
  diaryId,
  diaryTitle,
  diaryContent,
  diaryDate,
  diaryModifiedDate,
}) {
  const [title, setTitle] = useState(diaryTitle);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  const updateDiary = useDiaryStore((state) => state.updateDiary);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: diaryContent || EMPTY_CONTENT,
    theme: { webview: { backgroundColor: 'transparent' } },
  });

  const editorState = useBridgeState(editor);

  // 切換日記時同步標題與內容
  useEffect(() => {
    setTitle(diaryTitle);
  }, [diaryId, diaryTitle]);

  useEffect(() => {
    editor?.setPlaceholder?.(PLACEHOLDER);
  }, [editor]);

  useEffect(() => {
    editor?.setContent?.(diaryContent || EMPTY_CONTENT);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 僅在切換日記時更新，避免覆蓋編輯中內容
  }, [diaryId]);

  const handleSave = async () => {
    if (!editor) return;
    const content = await editor.getHTML();
    if (diaryId) updateDiary(diaryId, title, content);
    editor.blur();
    Keyboard.dismiss();
  };

  const handleInsertImage = async () => {
    if (isProcessingPhoto) return;
    setIsProcessingPhoto(true);
    try {
      const result = await pickImageAndConvertToBase64();
      if (result?.base64) {
        const imageUri = result.base64.startsWith('data:image')
          ? result.base64
          : `data:image/jpeg;base64,${result.base64}`;
        editor?.focus();
        editor?.setImage(imageUri);
      }
    } catch {
      Alert.alert('錯誤', '插入圖片失敗');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const toolbarItems = [
    DEFAULT_TOOLBAR_ITEMS[0], // bold
    DEFAULT_TOOLBAR_ITEMS[1], // italic
    {
      onPress: () => () => handleInsertImage(),
      active: () => false,
      disabled: () => isProcessingPhoto,
      image: () => IMAGE_BUTTON_ICON,
    },
    DEFAULT_TOOLBAR_ITEMS[9], // orderedList
    DEFAULT_TOOLBAR_ITEMS[10], // bulletList
  ];

  const toolbarArgs = {
    editor,
    editorState,
    setToolbarContext: () => {},
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
              disabled={item.disabled(toolbarArgs)}
            >
              <View className="items-center justify-center">
                <Image
                  source={item.image(toolbarArgs)}
                  style={{ width: 22, height: 22 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          className="px-3 py-2"
          onPress={handleSave}
        >
          <Text className="text-base text-gray-700 font-medium">完成</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          <View className="p-6 flex-1 bg-gray-100">
            <TextInput
              className="text-2xl font-bold mb-2 text-gray-800"
              value={title}
              onChangeText={setTitle}
              placeholder="輸入標題..."
              placeholderTextColor="#9CA3AF"
            />

            <View className="mb-4">
              {diaryModifiedDate && (
                <Text className="text-sm text-gray-500">
                  修改日期：{diaryModifiedDate}
                </Text>
              )}
            </View>

            <View className="flex-1 min-h-[500px]">
              <RichText editor={editor} className="flex-1 bg-transparent" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
