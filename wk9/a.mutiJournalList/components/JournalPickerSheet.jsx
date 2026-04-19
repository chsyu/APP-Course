import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDiaryStore from '../store/useDiaryStore';

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

  const journals = useMemo(
    () => [...journalsRaw].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [journalsRaw]
  );

  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const prevSheetOpenRef = useRef(false);

  /**
   * 勿在初次 mount（已關閉）時呼叫 hide()：部分版本會走完關閉流程並觸發 onClose →
   * closeJournalSheet → 父層重 render → 再次 effect → 形成 Maximum update depth。
   * 僅在「由開變關」時才 hide；由關變開時 show。
   */
  useEffect(() => {
    const prev = prevSheetOpenRef.current;
    if (journalSheetOpen && !prev) {
      sheetRef.current?.show();
    } else if (!journalSheetOpen && prev) {
      sheetRef.current?.hide();
    }
    prevSheetOpenRef.current = journalSheetOpen;
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

  const renderItem = ({ item }) => {
    const isActive = item.id === activeJournalId;
    return (
      <Pressable
        onPress={() => handleSelectJournal(item.id)}
        className="flex-row items-center px-5 py-4 border-b border-gray-100"
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#F3F4F6' : isActive ? '#F0FDF4' : '#fff',
        })}
      >
        <View className="flex-1 mr-2" style={{ minWidth: 0 }}>
          <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
            {item.name}
          </Text>
          {isActive ? <Text className="text-xs text-gray-500 mt-1">目前使用中</Text> : null}
        </View>
        {isActive ? <Ionicons name="checkmark-circle" size={22} color="#16A34A" /> : null}
      </Pressable>
    );
  };

  return (
    <>
      <ActionSheet
        ref={sheetRef}
        onClose={handleSheetClose}
        containerStyle={sheetContainerStyle}
        gestureEnabled
        closable
        defaultOverlayOpacity={0.5}
      >
        <View style={{ height: sheetMaxHeight }}>
          <View className="flex-row items-center justify-between px-4 pt-3 pb-3 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900">日記</Text>
            <Pressable
              onPress={() => {
                setNameInput('新日記本');
                setNameModalOpen(true);
              }}
              className="px-3 py-2 rounded-lg active:bg-gray-100"
            >
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
                <Text className="text-gray-400">尚無日記本</Text>
              </View>
            }
          />
        </View>
      </ActionSheet>

      <Modal visible={nameModalOpen} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1 bg-black/40 justify-center px-6"
        >
          <View className="bg-white rounded-2xl p-5">
            <Text className="text-lg font-bold text-gray-900 mb-3">新增日記本</Text>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="名稱"
              className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 mb-4"
              autoFocus
              selectTextOnFocus
            />
            <View className="flex-row justify-end gap-3">
              <Pressable onPress={() => setNameModalOpen(false)} className="px-4 py-2">
                <Text className="text-base text-gray-600">取消</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  createJournal(nameInput.trim() || '新日記本');
                  setNameModalOpen(false);
                }}
                className="px-4 py-2"
              >
                <Text className="text-base font-semibold text-gray-900">確定</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
