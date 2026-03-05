import React, { useState, useRef } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { useDiaryStore } from '../store/useDiaryStore';
import { pickImageAndConvertToBase64 } from '../utils/photoHandler';
import { formatISOToDiaryDate } from '../utils/dateFormatter';

export default function DiaryContent({ diaryId, diaryTitle, diaryContent, diaryDate, diaryLastModifiedTimestamp }) {
  const [title, setTitle] = useState(diaryTitle);
  const [htmlContent, setHtmlContent] = useState(diaryContent || '<p></p>');
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  
  const titleInputRef = useRef(null);
  const richTextEditorRef = useRef(null);
  const scrollViewRef = useRef(null);

  const updateDiary = useDiaryStore((state) => state.updateDiary);

  const handleSave = async () => {
    setIsEditing(false);
    if (richTextEditorRef.current) {
      const content = await richTextEditorRef.current.getContentHtml();
      setHtmlContent(content);
      if (diaryId) {
        updateDiary(diaryId, title, content);
      }
      richTextEditorRef.current.blurContentEditor();
    }
  };

  const handleInsertImage = async () => {
    if (isProcessingPhoto) return;
    setIsProcessingPhoto(true);

    try {
      const result = await pickImageAndConvertToBase64();
      if (result && result.base64) {
        const imageUri = result.base64.startsWith('data:image') 
          ? result.base64 
          : `data:image/jpeg;base64,${result.base64}`;

        // 核心優化：使用 Aspect Ratio 預留空間，避免高度計算延遲
        // 假設裁切比例為 4:3，設定背景色作為加載佔位
        const imageHTML = `
          <div style="margin: 10px 0;">
            <img 
              src="${imageUri}" 
              style="
                width: 100%; 
                aspect-ratio: 4/3; 
                height: auto; 
                display: block; 
                border-radius: 8px; 
                background-color: #E5E7EB;
              " 
            />
          </div>
          <p></p>
        `;
        
        // 使用 insertHTML 以套用自定義樣式
        richTextEditorRef.current?.insertHTML(imageHTML);
        
        // 僅需極短延遲讓 WebView 處理 DOM 插入後的 Reflow
        setTimeout(() => {
          richTextEditorRef.current?.focusContentEditor();
        }, 50);
      }
    } catch (error) {
      Alert.alert('錯誤', '插入圖片失敗');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {isEditing && (
        <View className="flex-row items-center bg-[#F3F4F6] border-b border-gray-200 z-[1000]">
          <View className="flex-1">
            <RichToolbar
              editor={richTextEditorRef}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertImage,
              ]}
              onPressAddImage={handleInsertImage}
              iconTint="#000000"
              selectedIconTint="#2095F2"
              style={{ backgroundColor: 'transparent' }}
              flatContainerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
          <TouchableOpacity
            onPress={handleSave}
            className="px-4 py-2 mr-2 bg-[#F3F4F6] rounded"
          >
            <Text className="text-black text-base font-semibold">完成</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* 背景色設為淺灰色以與 Toolbar 統一 */}
        <View className="p-6 flex-1 bg-[#F3F4F6]">
          <TextInput
            ref={titleInputRef}
            className="text-2xl font-bold mb-2 text-gray-800"
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            onFocus={() => setIsEditing(false)}
            onBlur={handleSave}
          />
          
          <View className="mb-4">
            {diaryLastModifiedTimestamp && (() => {
              const formattedDate = formatISOToDiaryDate(diaryLastModifiedTimestamp);
              // 只有當格式化日期與建立日期不同時才顯示（表示有修改過）
              if (formattedDate && formattedDate !== diaryDate) {
                return <Text className="text-sm text-gray-500">修改日期：{formattedDate}</Text>;
              }
              return null;
            })()}
          </View>

          <View className="flex-1">
            <RichEditor
              ref={richTextEditorRef}
              onChange={setHtmlContent}
              initialContentHTML={htmlContent}
              placeholder="開始輸入您的日記..."
              initialHeight={500}
              onFocus={() => setIsEditing(true)}
              androidHardwareAccelerationDisabled={true}
              containerStyle={{ backgroundColor: 'transparent' }}
              editorStyle={{
                backgroundColor: 'transparent',
                color: '#1F2937',
                // 使用 CSS 確保底部永遠有緩衝空間，不截斷文字
                contentCSSText: `
                  font-size: 18px; 
                  line-height: 1.75; 
                  min-height: 500px; 
                  padding-bottom: 80px; 
                `,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}