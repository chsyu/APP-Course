import * as Location from 'expo-location';

/**
 * 获取当前位置的经纬度
 * @returns {Promise<{latitude: number, longitude: number} | null>}
 */
export async function getCurrentLocation() {
  try {
    // 请求位置权限
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('位置权限被拒绝');
      return null;
    }

    // 获取当前位置
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('获取位置失败:', error);
    return null;
  }
}

/**
 * 将经纬度四舍五入到指定精度（用于位置聚合）
 * @param {number} lat - 纬度
 * @param {number} lng - 经度
 * @param {number} precision - 小数位数，默认4位（约11米精度）
 * @returns {{latitude: number, longitude: number}}
 */
export function roundCoordinates(lat, lng, precision = 4) {
  const factor = Math.pow(10, precision);
  return {
    latitude: Math.round(lat * factor) / factor,
    longitude: Math.round(lng * factor) / factor,
  };
}

