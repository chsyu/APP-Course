/**
 * 從 HTML 中取得純文字長度（不含標籤與圖片）
 * @param {string} html - HTML 字串
 * @returns {number} 純文字字數
 */
export function getPlainTextLength(html) {
  const withoutImg = (html || '').replace(/<img[^>]*>/gi, '');
  const plainText = withoutImg.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  return plainText.length;
}
