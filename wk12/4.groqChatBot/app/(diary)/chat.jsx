import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sendGroqChat } from '../../services/groqChatService';

const SYSTEM_PROMPT = {
  role: 'system',
  content:
    '你是一位友善的助理，請用繁體中文（台灣用語）簡潔、有條理地回答。',
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const listRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setError(null);
    setInput('');
    const userRow = { role: 'user', content: trimmed };
    const nextRows = [...rows, userRow];
    setRows(nextRows);
    setSending(true);

    const apiMessages = [SYSTEM_PROMPT, ...nextRows];

    try {
      const reply = await sendGroqChat(apiMessages);
      setRows((r) => [...r, { role: 'assistant', content: reply }]);
    } catch (e) {
      const message = e instanceof Error ? e.message : '發生錯誤';
      setError(message);
    } finally {
      setSending(false);
    }
  }

  function renderItem({ item }) {
    const isUser = item.role === 'user';
    return (
      <View className={`mb-3 px-4 ${isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-[85%] rounded-2xl px-3 py-2 ${
            isUser ? 'bg-gray-900' : 'bg-gray-100'
          }`}
        >
          <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-900'}`}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <FlatList
        ref={listRef}
        data={rows}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        contentContainerClassName="py-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 8 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-gray-500 text-base">
              輸入訊息開始與 Groq 模型對話。
            </Text>
          </View>
        }
        className="flex-1"
      />

      {error ? (
        <View className="px-4 pb-1">
          <Text className="text-red-600 text-sm">{error}</Text>
        </View>
      ) : null}

      <View
        className="flex-row items-end gap-2 border-t border-gray-200 bg-white px-3 py-2"
        style={{ paddingBottom: Math.max(insets.bottom, 10) }}
      >
        <TextInput
          className="flex-1 min-h-[40px] max-h-[120px] rounded-xl border border-gray-300 px-3 py-2 text-base text-gray-900"
          placeholder="輸入訊息…"
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          multiline
          editable={!sending}
          onSubmitEditing={send}
          blurOnSubmit={false}
        />
        <Pressable
          onPress={send}
          disabled={sending || !input.trim()}
          className={`rounded-xl px-4 py-3 ${sending || !input.trim() ? 'bg-gray-300' : 'bg-gray-900'}`}
        >
          {sending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-medium">送出</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
