import axios from 'axios';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.1-8b-instant';


export async function sendGroqChat(messages) {
  const key = process.env.EXPO_PUBLIC_GROQ_API_KEY;
  if (!key) {
    throw new Error('缺少 EXPO_PUBLIC_GROQ_API_KEY');
  }

  try {
    const { data } = await axios.post(
      GROQ_URL,
      { model: DEFAULT_MODEL, messages },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        timeout: 120_000,
      }
    );
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) {
      throw new Error('回應格式異常');
    }
    return content.trim();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const msg =
        e.response?.data?.error?.message ||
        e.message ||
        `請求失敗（${e.response?.status ?? '?'}）`;
      throw new Error(msg);
    }
    throw e;
  }
}
