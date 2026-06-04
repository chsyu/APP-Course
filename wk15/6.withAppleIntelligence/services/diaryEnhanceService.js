import { apple } from '@react-native-ai/apple';
import { generateText } from 'ai';

const MAX_DRAFT_LENGTH = 3000;

const ENHANCE_USER_PROMPT = (draft) =>
  `Rewrite the following diary draft into fluent Traditional Chinese (繁體中文).
Keep the same facts; do not invent details.
Output only the rewritten diary body—no title, no explanation, no markdown.

Draft:
${draft}`;

const ENHANCE_USER_PROMPT_FALLBACK = (draft) =>
  `Improve the following text in Traditional Chinese (繁體中文). Output only the improved text:

${draft}`;

/**
 * @param {unknown} error
 * @returns {string}
 */
export function formatDiaryEnhanceError(error) {
  const message =
    error instanceof Error ? error.message : String(error ?? '未知錯誤');

  if (
    message.includes('GenerationError error -1') ||
    message.includes('ModelManagerError') ||
    message.includes('Code=1026') ||
    message.includes('modelcatalog') ||
    message.includes('underlying assets')
  ) {
    return (
      'Apple Intelligence 模型暫時無法使用（系統錯誤 -1）。\n\n' +
      '請確認：\n' +
      '1. 設定 → Apple Intelligence 與 Siri 已開啟，且模型已下載完成\n' +
      '2. 裝置語言／地區與 Siri 語言為支援項目（建議繁體中文或英文）\n' +
      '3. 使用實機測試（模擬器常不穩定）\n' +
      '4. 重新啟動裝置後再試\n\n' +
      '若仍失敗，可能是 iOS／Xcode 版本與模型資產不一致，需更新系統後再試。'
    );
  }

  if (
    message.includes('unsupportedLanguage') ||
    message.includes('unsupported language')
  ) {
    return '目前系統語言或地區不支援 Apple Intelligence 文字生成，請在設定中改為支援的語言後再試。';
  }

  if (
    message.includes('guardrail') ||
    message.includes('sensitive') ||
    message.includes('unsafe')
  ) {
    return '內容無法處理（可能觸發系統安全限制），請調整草稿後再試。';
  }

  if (message.includes('MODEL_UNAVAILABLE')) {
    return 'Apple Intelligence 尚未就緒，請在設定中開啟並等待模型下載完成後再試。';
  }

  return message || '潤飾失敗，請稍後再試。';
}

/**
 * @param {string} plainText
 * @returns {string}
 */
function normalizeDraft(plainText) {
  return plainText
    .replace(/\u00a0/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * @param {string} userPrompt
 * @returns {Promise<string>}
 */
async function runEnhance(userPrompt) {
  const { text } = await generateText({
    model: apple(),
    messages: [{ role: 'user', content: userPrompt }],
    temperature: 0.5,
    maxOutputTokens: 800,
  });

  const result = text?.trim();
  if (!result) {
    throw new Error('模型未回傳內容，請稍後再試。');
  }
  return result;
}

export function isDiaryEnhanceAvailable() {
  return apple.isAvailable();
}

/**
 * @param {string} plainText
 * @returns {Promise<string>}
 */
export async function enhanceDiaryDraft(plainText) {
  if (!isDiaryEnhanceAvailable()) {
    throw new Error('此裝置無法使用 Apple Intelligence 潤飾功能');
  }

  const draft = normalizeDraft(plainText);
  if (!draft) {
    throw new Error('請先輸入日記內容');
  }

  const clipped =
    draft.length > MAX_DRAFT_LENGTH
      ? `${draft.slice(0, MAX_DRAFT_LENGTH)}…`
      : draft;

  try {
    return await runEnhance(ENHANCE_USER_PROMPT(clipped));
  } catch (firstError) {
    const firstMessage = formatDiaryEnhanceError(firstError);
    const shouldRetry =
      firstMessage.includes('錯誤 -1') ||
      firstMessage.includes('模型暫時無法') ||
      (firstError instanceof Error &&
        firstError.message.includes('GenerationError'));

    if (!shouldRetry) {
      throw new Error(firstMessage);
    }

    try {
      return await runEnhance(ENHANCE_USER_PROMPT_FALLBACK(clipped));
    } catch (secondError) {
      throw new Error(formatDiaryEnhanceError(secondError));
    }
  }
}
