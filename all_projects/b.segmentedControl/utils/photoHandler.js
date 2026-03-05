import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

/**
 * 請求相簿存取權限
 */
export const requestMediaLibraryPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('需要相簿權限才能選擇照片！');
    return false;
  }
  return true;
};

/**
 * 從相簿選擇照片
 * @returns {Promise<{uri: string, cancelled: boolean}>}
 */
export const pickImage = async () => {
  // 請求權限
  const hasPermission = await requestMediaLibraryPermissions();
  if (!hasPermission) {
    return { uri: null, cancelled: true };
  }

  // 開啟圖片選擇器
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

  if (result.canceled) {
    return { uri: null, cancelled: true };
  }

  return { uri: result.assets[0].uri, cancelled: false };
};

/**
 * 將照片複製到應用本地儲存
 * @param {string} sourceUri - 原始照片 URI
 * @param {string} diaryId - 日記 ID
 * @returns {Promise<string|null>} 返回本地照片 URI，失敗返回 null
 */
export const copyImageToLocal = async (sourceUri, diaryId) => {
  try {
    // 確保目錄存在
    const directory = `${FileSystem.documentDirectory}diary_photos/`;
    const dirInfo = await FileSystem.getInfoAsync(directory);
    
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }

    // 生成檔案名稱
    const timestamp = Date.now();
    const filename = `diary_${diaryId}_${timestamp}.jpg`;
    const destinationUri = `${directory}${filename}`;

    // 複製檔案
    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });

    return destinationUri;
  } catch (error) {
    console.error('複製照片失敗:', error);
    alert('複製照片失敗，請重試');
    return null;
  }
};

/**
 * 刪除本地儲存的照片
 * @param {string} photoUri - 照片 URI
 * @returns {Promise<boolean>} 成功返回 true，失敗返回 false
 */
export const deleteLocalImage = async (photoUri) => {
  try {
    if (!photoUri) {
      return true; // 沒有照片，視為成功
    }

    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(photoUri, { idempotent: true });
    }
    return true;
  } catch (error) {
    console.error('刪除照片失敗:', error);
    return false;
  }
};

