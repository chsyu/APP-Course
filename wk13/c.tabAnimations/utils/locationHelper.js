import * as Location from 'expo-location';

/** 與地圖預設區域、CWB 臺北市預報語意對齊之後備座標 */
export const TAIPEI_CENTER = {
  latitude: 25.033,
  longitude: 121.5654,
};

/**
 * 取得目前位置的經緯度
 * @returns {Promise<{latitude: number, longitude: number} | null>}
 */
export async function getCurrentLocation() {
  try {
    // 請求位置權限
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('位置權限遭到拒絕');
      return null;
    }

    // 取得目前位置
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('取得位置失敗：', error);
    return null;
  }
}

/**
 * 建立日記用座標：優先 GPS，失敗或拒絕權限時使用 {@link TAIPEI_CENTER}
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export async function getDiaryCreationCoordinates() {
  const loc = await getCurrentLocation();
  return loc ?? TAIPEI_CENTER;
}

/**
 * 將經緯度四捨五入到指定精度（用於位置聚合）
 * @param {number} lat - 緯度
 * @param {number} lng - 經度
 * @param {number} precision - 小數位數，預設 4 位（約 11 公尺精度）
 * @returns {{latitude: number, longitude: number}}
 */
export function roundCoordinates(lat, lng, precision = 4) {
  const factor = Math.pow(10, precision);
  return {
    latitude: Math.round(lat * factor) / factor,
    longitude: Math.round(lng * factor) / factor,
  };
}
