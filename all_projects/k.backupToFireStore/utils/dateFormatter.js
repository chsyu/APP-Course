import { format, parse } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化日記日期（完整格式：年月日 時分）
 * @param {Date} date - 日期物件，預設為當前時間
 * @returns {string} 格式化後的日期字串，例如：2024年01月15日 08:30
 */
export const formatDiaryDate = (date = new Date()) => {
  return format(date, 'yyyy年MM月dd日 HH:mm', { locale: zhCN });
};

/**
 * 將格式化日期字串轉換為 ISO 8601 字串（用於向後兼容舊資料）
 * @param {string} dateString - 格式化日期字串，例如：2024年01月15日 08:30
 * @returns {string|null} ISO 8601 字串，例如：2024-01-15T08:30:00.000Z，失敗返回 null
 */
export const parseDiaryDateToISO = (dateString) => {
  if (!dateString) return null;
  
  try {
    // 解析格式：yyyy年MM月dd日 HH:mm
    const date = parse(dateString, 'yyyy年MM月dd日 HH:mm', new Date(), { locale: zhCN });
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString();
  } catch (error) {
    console.error('解析日期失敗:', error);
    return null;
  }
};



