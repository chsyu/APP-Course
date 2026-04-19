import { format, isValid, parse } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/** 與 formatDiaryDate 對應，用於排序與解析 */
const DIARY_DATE_FORMAT = 'yyyy年MM月dd日 HH:mm';

/**
 * 格式化日記日期（完整格式：年月日 時分）
 * @param {Date} date - 日期物件，預設為當前時間
 * @returns {string} 格式化後的日期字串，例如：2024年01月15日 08:30
 */
export const formatDiaryDate = (date = new Date()) => {
  return format(date, DIARY_DATE_FORMAT, { locale: zhCN });
};

/**
 * 將日記條目轉成可排序的時間戳（毫秒）：優先 parsed `date` 欄位，其次 updatedAtMs、舊版 lastModifiedTimestamp。
 * @param {{ date?: string, updatedAtMs?: number, lastModifiedTimestamp?: string | null } | null | undefined} d
 * @returns {number}
 */
export function diaryEntryDateMs(d) {
  if (!d || typeof d !== 'object') return 0;
  if (typeof d.date === 'string' && d.date.trim().length > 0) {
    const parsed = parse(d.date.trim(), DIARY_DATE_FORMAT, new Date(), {
      locale: zhCN,
    });
    if (isValid(parsed)) return parsed.getTime();
  }
  if (typeof d.updatedAtMs === 'number' && d.updatedAtMs > 0) return d.updatedAtMs;
  if (d.lastModifiedTimestamp) {
    const t = Date.parse(d.lastModifiedTimestamp);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}

/**
 * 依日記「日期」由新到舊排序（不改變原陣列）
 * @param {Array<{ date?: string, updatedAtMs?: number, lastModifiedTimestamp?: string | null }>} diaries
 * @returns {typeof diaries}
 */
export function sortDiariesByEntryDateDesc(diaries) {
  if (!Array.isArray(diaries)) return [];
  return [...diaries].sort((a, b) => diaryEntryDateMs(b) - diaryEntryDateMs(a));
}



