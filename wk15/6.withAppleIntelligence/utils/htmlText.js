/**
 * @param {string} html
 * @returns {string}
 */
export function htmlToPlainText(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * @param {string} text
 * @returns {string}
 */
export function plainTextToDiaryHtml(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return '<p></p>';
  }

  const paragraphs = trimmed
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return '<p></p>';
  }

  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
