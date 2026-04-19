import React, { useState, useMemo } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { Ionicons } from '@expo/vector-icons';
import {
  RichText,
  useEditorBridge,
  useBridgeState,
  DEFAULT_TOOLBAR_ITEMS,
} from '@10play/tentap-editor';
import useDiaryStore from '../store/useDiaryStore';
import { useUserStore } from '../store/useUserStore';
import { pickImage } from '../utils/photoHandler';
import { DEFAULT_JOURNAL_ID } from '../services/diarySyncService';
import { normalizeAuthEmail } from '../services/userService';

export default function DiaryContent({
  diaryId,
  diaryJournalId,
  diaryTitle,
  diaryContent,
  diaryDate,
  diaryModifiedDate,
}) {
  const [title, setTitle] = useState(diaryTitle);
  const updateDiary = useDiaryStore((state) => state.updateDiary);
  const journals = useDiaryStore((state) => state.journals);
  const diaryRow = useDiaryStore((s) =>
    diaryId ? s.diaries.find((d) => d.id === diaryId) ?? null : null
  );
  const myEmail = useUserStore((s) => normalizeAuthEmail(s.user?.email));

  const journal = useMemo(() => {
    const jid =
      diaryJournalId != null && String(diaryJournalId) !== ''
        ? String(diaryJournalId)
        : DEFAULT_JOURNAL_ID;
    return journals.find((j) => j.id === jid) ?? null;
  }, [diaryJournalId, journals]);

  const isSharedJournal = journal?.kind === 'shared';
  const authorEmail = normalizeAuthEmail(diaryRow?.createdByEmail);
  const isAuthor =
    !isSharedJournal || (Boolean(myEmail) && Boolean(authorEmail) && myEmail === authorEmail);
  const canEdit = isAuthor;

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: diaryContent,
    theme: { webview: { backgroundColor: 'transparent' } },
    editable: canEdit,
  });

  const editorState = useBridgeState(editor);

  const handleSave = async () => {
    if (!canEdit) return;
    if (!editor) return;
    editor.blur();
    Keyboard.dismiss();
    const content = await editor.getHTML();
    if (diaryId)
      updateDiary(diaryId, title, content);
  };

  const handleInsertImage = async () => {
    if (!canEdit) return;
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        editor?.setImage(imageUri);
      }
    } catch {
      Alert.alert('錯誤', '插入圖片失敗');
    }
  };

  const toolbarItems = [
    DEFAULT_TOOLBAR_ITEMS[0],
    DEFAULT_TOOLBAR_ITEMS[1],
    {
      onPress: () => () => handleInsertImage(),
      active: () => false,
      pickImageIcon: 'image-outline',
    },
    DEFAULT_TOOLBAR_ITEMS[9],
    DEFAULT_TOOLBAR_ITEMS[10],
  ];

  const toolbarArgs = {
    editor,
    editorState,
    setToolbarContext: () => { },
    toolbarContext: 0,
  };

  return (
    <View className="flex-1">
      {canEdit ? (
        <View className="flex-row items-center justify-between bg-gray-100 border-b border-gray-200 h-11 min-h-[44px] px-2 z-[1000]">
          <View className="flex-row items-center gap-1">
            {toolbarItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`px-2.5 py-2 rounded ${item.active(toolbarArgs) ? 'bg-gray-200' : ''}`}
                onPress={item.onPress(toolbarArgs)}
              >
                <View className="items-center justify-center">
                  {item.pickImageIcon ? (
                    <Ionicons name={item.pickImageIcon} size={22} color="gray" />) : (
                    <Image
                      source={item.image(toolbarArgs)}
                      style={{ width: 22, height: 22 }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            className="px-3 py-2"
            onPress={handleSave}
          >
            <Text className="text-base text-gray-700 font-medium">完成</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <Text className="text-sm text-amber-900 text-center">
            僅作者可編輯此篇日記
          </Text>
        </View>
      )}

      <KeyboardAwareScrollView bottomOffset={40}>
        <View className="p-6 flex-1 bg-gray-100">
          <TextInput
            className="text-2xl font-bold mb-2 text-gray-800"
            value={title}
            onChangeText={setTitle}
            placeholder="輸入標題..."
            placeholderTextColor="#9CA3AF"
            editable={canEdit}
          />

          <View className="mb-4">
            {isSharedJournal ? (
              <Text className="text-sm text-gray-500">
                {diaryRow?.modifiedDate
                  ? `${diaryRow.lastEditedByEmail || diaryRow.createdByEmail || '—'} 修改於 ${diaryRow.modifiedDate}`
                  : `${diaryRow?.createdByEmail || diaryRow?.lastEditedByEmail || '—'} 建立於 ${diaryDate}`}
              </Text>
            ) : diaryModifiedDate === '' ? (
              <Text className="text-sm text-gray-500">建立日期：{diaryDate}</Text>
            ) : (
              <Text className="text-sm text-gray-500">修改日期：{diaryModifiedDate}</Text>
            )}
          </View>

          <View className="flex-1 min-h-[500px]">
            <RichText editor={editor} className="flex-1 bg-transparent" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
