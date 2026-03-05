import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
import { File } from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

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
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

/**
 * 壓縮和調整圖片大小
 * @param {string} imageUri - 原始圖片 URI
 * @returns {Promise<string|null>} 返回處理後的圖片 URI，失敗返回 null
 */
export const compressAndResizeImage = async (imageUri) => {
  try {
    if (!imageUri) {
      return null;
    }

    // 使用 expo-image-manipulator 調整圖片大小和壓縮
    const manipulated = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 1200 } }], // 最大寬度 1200px，保持長寬比
      { 
        compress: 0.8, // 壓縮質量 80%
        format: ImageManipulator.SaveFormat.JPEG 
      }
    );

    return manipulated.uri;
  } catch (error) {
    console.error('壓縮圖片失敗:', error);
    return null;
  }
};

/**
 * 將圖片轉換為 Base64 字符串
 * @param {string} imageUri - 圖片 URI
 * @returns {Promise<string|null>} 返回 Base64 字符串（data:image/jpeg;base64,...格式），失敗返回 null
 */
export const imageToBase64 = async (imageUri) => {
  try {
    if (!imageUri) return null;

    // 初始化 File 對象
    const file = new File(imageUri);

    // 檢查文件是否存在
    // 注意：在新版 API 中，exists 是屬性而非函數
    if (!file.exists) {
      console.error('文件不存在:', imageUri);
      return null;
    }

    // 獲取 base64
    const base64Data = await file.base64();

    // 取得副檔名並判斷 MIME 類型
    const extension = imageUri.split('.').pop().toLowerCase();
    const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';

    return `data:${mimeType};base64,${base64Data}`;
    
  } catch (error) {
    console.error('轉換圖片為 Base64 失敗:', error.message);
    return null;
  }
};




/**
 * 選擇圖片並轉換為 Base64（包含壓縮）
 * @returns {Promise<{base64: string|null, cancelled: boolean}>} 返回 Base64 字符串或取消狀態
 */
export const pickImageAndConvertToBase64 = async () => {
  try {
    // 選擇圖片
    const result = await pickImage();
    
    if (result.cancelled || !result.uri) {
      return { base64: null, cancelled: true };
    }

    // 壓縮和調整大小
    const compressedUri = await compressAndResizeImage(result.uri);
    if (!compressedUri) {
      return { base64: null, cancelled: false };
    }

    // 轉換為 Base64
    const base64 = await imageToBase64(compressedUri);
    
    return { base64, cancelled: false };
  } catch (error) {
    console.error('選擇並轉換圖片失敗:', error);
    return { base64: null, cancelled: false };
  }
};

