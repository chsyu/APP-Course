/**
 * 從 HTML 中取得純文字（不含標籤與圖片）
 * @param {string} html - HTML 字串
 * @returns {string} 純文字
 */
function getPlainText(html) {
  const withoutImg = (html || '').replace(/<img[^>]*>/gi, '');
  return withoutImg.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}

/**
 * 從 HTML 中取得純文字長度（不含標籤與圖片）
 * @param {string} html - HTML 字串
 * @returns {number} 純文字字數
 */
export function getPlainTextLength(html) {
  return getPlainText(html).length;
}

/**
 * 從 HTML 中取得純文字摘要（用於預覽）
 * @param {string} html - HTML 字串
 * @param {number} maxLength - 最大字數，預設 50
 * @returns {string} 純文字摘要
 */
export function getPlainTextSnippet(html, maxLength = 50) {
  const plainText = getPlainText(html);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + '...';
}
