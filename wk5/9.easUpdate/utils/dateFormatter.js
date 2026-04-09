import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化日記日期（完整格式：年月日 時分）
 * @param {Date} date - 日期物件，預設為當前時間
 * @returns {string} 格式化後的日期字串，例如：2024年01月15日 08:30
 */
export const formatDiaryDate = (date = new Date()) => {
  return format(date, 'yyyy年MM月dd日 HH:mm', { locale: zhCN });
};



