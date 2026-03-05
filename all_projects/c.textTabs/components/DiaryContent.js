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
import { Image } from 'expo-image';
import { useDiaryStore } from '../store/useDiaryStore';
import { pickImage, copyImageToLocal, deleteLocalImage } from '../utils/photoHandler';

export default function DiaryContent({ diaryId, diaryTitle, diaryContent, diaryDate, diaryModifiedDate, diaryPhotoUri }) {
  // 1. 定義狀態：日記標題、內容與是否正在編輯
  const [title, setTitle] = useState(diaryTitle);
  const [content, setContent] = useState(diaryContent);
  const [isEditing, setIsEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState(diaryPhotoUri || null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const textInputRef = useRef(null);
  const titleInputRef = useRef(null);

  // 從 Zustand store 獲取更新函數和當前日記資料
  const updateDiary = useDiaryStore((state) => state.updateDiary);
  const clearDiaryPhoto = useDiaryStore((state) => state.clearDiaryPhoto);
  const errorHandledRef = useRef(false);
  
  // 獲取當前日記的修改日期（從 store 中獲取最新值）


  // 處理照片載入錯誤
  const handleImageError = () => {
    if (!errorHandledRef.current && photoUri) {
      errorHandledRef.current = true;
      // 清除本地狀態
      setPhotoUri(null);
      // 清除 store 中的照片 URI
      if (diaryId) {
        clearDiaryPhoto(diaryId);
      }
    }
  };

  // 2. 實作儲存邏輯
  const handleSave = () => {
    setIsEditing(false);
    // 調用 Zustand store 的更新函數
    if (diaryId) {
      updateDiary(diaryId, title, content, photoUri);
    }
    console.log('Saved:', title, content, 'Photo:', photoUri);
  };

  // 3. 照片處理函數
  const handlePickImage = async () => {
    if (isProcessingPhoto) return;
    
    setIsProcessingPhoto(true);
    try {
      // 選擇照片
      const result = await pickImage();
      if (result.cancelled || !result.uri) {
        setIsProcessingPhoto(false);
        return;
      }

      // 刪除舊照片（如果存在）
      if (photoUri) {
        await deleteLocalImage(photoUri);
      }

      // 複製到本地儲存
      const localUri = await copyImageToLocal(result.uri, diaryId);
      if (localUri) {
        setPhotoUri(localUri);
        // 立即更新 store
        updateDiary(diaryId, title, content, localUri);
      }
    } catch (error) {
      console.error('選擇照片失敗:', error);
      Alert.alert('錯誤', '選擇照片失敗，請重試');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleDeletePhoto = async () => {
    Alert.alert(
      '刪除照片',
      '確定要刪除這張照片嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            if (photoUri) {
              const success = await deleteLocalImage(photoUri);
              if (success) {
                setPhotoUri(null);
                // 立即更新 store
                updateDiary(diaryId, title, content, null);
              }
            }
          },
        },
      ]
    );
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
            ref={titleInputRef}
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

          {/* 照片顯示區域 - 編輯模式 */}
          {isEditing && (
            <View className="mb-4">
              {photoUri ? (
                // 有照片：顯示圖片 + 右上角刪除按鈕
                <View style={{ position: 'relative' }}>
                  <Image
                    source={{ uri: photoUri }}
                    style={{ width: '100%', height: 200, borderRadius: 12 }}
                    contentFit="cover"
                    transition={200}
                    onError={handleImageError}
                  />
                  <TouchableOpacity
                    onPress={handleDeletePhoto}
                    disabled={isProcessingPhoto}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: isProcessingPhoto ? 0.5 : 1,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // 無照片：顯示可點擊的 placeholder
                <TouchableOpacity
                  onPress={handlePickImage}
                  disabled={isProcessingPhoto}
                  className="bg-gray-300 rounded-xl"
                  style={{
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: isProcessingPhoto ? 0.5 : 1,
                  }}
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-700 text-lg">
                    {isProcessingPhoto ? '處理中...' : '📷 選擇照片'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* 照片顯示區域 - 非編輯模式 */}
          {!isEditing && photoUri && (
            <View className="mb-4">
              <Image
                source={{ uri: photoUri }}
                style={{ width: '100%', height: 200, borderRadius: 12 }}
                contentFit="cover"
                transition={200}
                onError={handleImageError}
              />
            </View>
          )}
          {isEditing ? (
            <View className="flex-1">
              <TextInput
                ref={textInputRef}
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