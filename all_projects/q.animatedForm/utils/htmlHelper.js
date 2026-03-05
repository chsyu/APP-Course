/**
 * HTML 處理工具函數
 */

/**
 * 將純文字轉換為 HTML 格式
 * @param {string} text - 純文字內容
 * @returns {string} HTML 格式的內容
 */
export const textToHTML = (text) => {
  if (!text || typeof text !== 'string') {
    return '<p></p>';
  }
  
  // 將文字按換行符分割，每個段落用 <p> 標籤包裹
  const paragraphs = text
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => `<p>${escapeHTML(line.trim())}</p>`)
    .join('');
  
  return paragraphs || '<p></p>';
};

/**
 * 從 HTML 中提取純文字（移除 HTML 標籤和圖片）
 * @param {string} html - HTML 內容
 * @returns {string} 純文字內容
 */
export const htmlToText = (html) => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  // 移除所有 HTML 標籤
  let text = html.replace(/<[^>]*>/g, '');
  
  // 解碼 HTML 實體
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // 清理多餘的空白字符
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
};

/**
 * 從 HTML 中提取所有 Base64 圖片
 * @param {string} html - HTML 內容
 * @returns {string[]} Base64 圖片字符串數組
 */
export const extractImagesFromHTML = (html) => {
  if (!html || typeof html !== 'string') {
    return [];
  }
  
  const imageRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/gi;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(html)) !== null) {
    images.push(match[1]);
  }
  
  return images;
};

/**
 * 從 HTML 中移除指定的圖片
 * @param {string} html - HTML 內容
 * @param {string} imageBase64 - 要移除的 Base64 圖片字符串
 * @returns {string} 移除圖片後的 HTML
 */
export const removeImageFromHTML = (html, imageBase64) => {
  if (!html || typeof html !== 'string' || !imageBase64) {
    return html;
  }
  
  // 移除包含指定 Base64 字符串的 img 標籤
  const escapedBase64 = imageBase64.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<img[^>]+src=["']${escapedBase64}["'][^>]*>`, 'gi');
  
  return html.replace(regex, '');
};

/**
 * 轉義 HTML 特殊字符
 * @param {string} text - 原始文字
 * @returns {string} 轉義後的文字
 */
const escapeHTML = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

