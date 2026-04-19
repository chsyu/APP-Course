import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDiaryStore from '../store/useDiaryStore';

/** list：日誌列表；create / edit：輸入日誌名稱表單 */
const SCENE_LIST = 'list';
const SCENE_CREATE = 'create';
const SCENE_EDIT = 'edit';

export default function JournalPickerSheet() {
  const sheetRef = useRef(null);
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const journalSheetOpen = useDiaryStore((s) => s.journalSheetOpen);
  const closeJournalSheet = useDiaryStore((s) => s.closeJournalSheet);
  const journalsRaw = useDiaryStore((s) => s.journals);
  const activeJournalId = useDiaryStore((s) => s.activeJournalId);
  const setActiveJournal = useDiaryStore((s) => s.setActiveJournal);
  const createJournal = useDiaryStore((s) => s.createJournal);
  const renameJournal = useDiaryStore((s) => s.renameJournal);

  const journals = useMemo(
    () => [...journalsRaw].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [journalsRaw]
  );

  const [scene, setScene] = useState(SCENE_LIST);
  const [nameInput, setNameInput] = useState('');
  const [editingJournalId, setEditingJournalId] = useState(null);
  const prevSheetOpenRef = useRef(false);

  useEffect(() => {
    const prev = prevSheetOpenRef.current;
    if (journalSheetOpen && !prev) {
      sheetRef.current?.show();
    } else if (!journalSheetOpen && prev) {
      sheetRef.current?.hide();
    }
    prevSheetOpenRef.current = journalSheetOpen;
  }, [journalSheetOpen]);

  useEffect(() => {
    if (!journalSheetOpen) {
      setScene(SCENE_LIST);
      setNameInput('');
      setEditingJournalId(null);
    }
  }, [journalSheetOpen]);

  const sheetMaxHeight = Math.min(windowHeight * 0.92, windowHeight - insets.top);

  const sheetContainerStyle = useMemo(
    () => ({
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: sheetMaxHeight,
    }),
    [sheetMaxHeight]
  );

  const handleSheetClose = useCallback(() => {
    if (useDiaryStore.getState().journalSheetOpen) closeJournalSheet();
  }, [closeJournalSheet]);

  const handleSelectJournal = (journalId) => {
    setActiveJournal(journalId);
    sheetRef.current?.hide();
    closeJournalSheet();
  };

  const goList = useCallback(() => {
    setScene(SCENE_LIST);
    setNameInput('');
    setEditingJournalId(null);
  }, []);

  const openCreate = useCallback(() => {
    setEditingJournalId(null);
    setNameInput('');
    setScene(SCENE_CREATE);
  }, []);

  const openEdit = useCallback((journal) => {
    setEditingJournalId(journal.id);
    setNameInput(journal.name ?? '');
    setScene(SCENE_EDIT);
  }, []);

  const confirmForm = useCallback(() => {
    const trimmed = nameInput.trim() || '新日誌';
    if (scene === SCENE_CREATE) {
      createJournal(trimmed);
    } else if (scene === SCENE_EDIT && editingJournalId) {
      renameJournal(editingJournalId, trimmed);
    }
    goList();
  }, [scene, nameInput, editingJournalId, createJournal, renameJournal, goList]);

  const formTitle = scene === SCENE_CREATE ? '新增日誌' : '編輯日誌';

  const renderItem = ({ item }) => {
    const isActive = item.id === activeJournalId;
    return (
      <View
        className="flex-row items-center border-b border-gray-100 pl-5"
        style={{ backgroundColor: isActive ? '#F0FDF4' : '#ffffff' }}
      >
        <Pressable
          onPress={() => handleSelectJournal(item.id)}
          className="flex-1 py-4 pr-2"
          style={({ pressed }) => ({
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
            {item.name}
          </Text>
          {isActive ? <Text className="text-xs text-gray-500 mt-1">目前使用中</Text> : null}
        </Pressable>
        <Pressable
          onPress={() => openEdit(item)}
          hitSlop={10}
          className="py-4 px-3 justify-center"
          accessibilityLabel="編輯日誌名稱"
        >
          <Ionicons name="create-outline" size={22} color="#374151" />
        </Pressable>
        <View className="w-11 py-4 pr-4 items-center justify-center">
          {isActive ? <Ionicons name="checkmark-circle" size={22} color="#16A34A" /> : null}
        </View>
      </View>
    );
  };

  return (
    <ActionSheet
      ref={sheetRef}
      onClose={handleSheetClose}
      containerStyle={sheetContainerStyle}
      gestureEnabled
      closable
      defaultOverlayOpacity={0.5}
    >
      <View style={{ height: sheetMaxHeight }} className="bg-white">
        {scene === SCENE_LIST ? (
          <>
            <View className="flex-row items-center justify-between px-4 pt-3 pb-3 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-900">日誌列表</Text>
              <Pressable onPress={openCreate} className="px-3 py-2 rounded-lg active:bg-gray-100">
                <Text className="text-base font-medium text-gray-800">新增</Text>
              </Pressable>
            </View>
            <FlatList
              data={journals}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
              ListEmptyComponent={
                <View className="py-16 items-center">
                  <Text className="text-gray-400">尚無日誌</Text>
                </View>
              }
            />
          </>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-white"
            style={{ flex: 1 }}
          >
            <View className="flex-row items-center border-b border-gray-200 px-2 pt-3 pb-3">
              <Pressable
                onPress={goList}
                hitSlop={12}
                className="w-11 h-11 items-center justify-center"
                accessibilityLabel="關閉"
              >
                <Ionicons name="close" size={28} color="#111827" />
              </Pressable>
              <Text className="flex-1 text-center text-lg font-bold text-gray-900">{formTitle}</Text>
              <Pressable
                onPress={confirmForm}
                hitSlop={12}
                className="w-11 h-11 items-center justify-center"
                accessibilityLabel={scene === SCENE_CREATE ? '建立日誌' : '儲存日誌名稱'}
              >
                <Ionicons name="checkmark" size={28} color="#16A34A" />
              </Pressable>
            </View>
            <View className="px-5 pt-6 flex-1">
              <Text className="text-sm text-gray-500 mb-2">日誌名稱</Text>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                placeholder="例如：旅遊手帳"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={confirmForm}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </ActionSheet>
  );
}
