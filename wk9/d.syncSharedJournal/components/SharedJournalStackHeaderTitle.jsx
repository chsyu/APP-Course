import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Pressable, Image, FlatList, useWindowDimensions } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDiaryStore from '../store/useDiaryStore';

const AVATAR_SIZE = 28;
const AVATAR_OVERLAP = 10;
const MAX_STACK = 5;
const SHEET_ROW_AVATAR = 48;

/**
 * 根 Stack 的 headerTitle：日誌名稱 +（分享日誌）堆疊頭像；點頭像開 ActionSheet 顯示頭像與姓名。
 */
export default function SharedJournalStackHeaderTitle() {
  const sheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const activeJournalId = useDiaryStore((s) => s.activeJournalId);
  const journals = useDiaryStore((s) => s.journals);
  const refreshJournalMemberSummaries = useDiaryStore((s) => s.refreshJournalMemberSummaries);

  const journal = useMemo(
    () => journals.find((j) => j.id === activeJournalId) ?? null,
    [journals, activeJournalId]
  );

  const title = journal?.name ?? '日誌';
  const isShared = journal?.kind === 'shared';
  const members = useMemo(
    () => (Array.isArray(journal?.memberSummaries) ? journal.memberSummaries : []),
    [journal]
  );

  useEffect(() => {
    if (!isShared || !journal?.id) return undefined;
    refreshJournalMemberSummaries(journal.id).catch(() => {});
    return undefined;
  }, [isShared, journal?.id, refreshJournalMemberSummaries]);

  const openSheet = useCallback(() => {
    if (!isShared || members.length === 0) return;
    sheetRef.current?.show();
  }, [isShared, members.length]);

  const stackMembers = members.slice(0, MAX_STACK);

  const renderSheetRow = ({ item }) => {
    const name = (item.userName || '').trim();
    const displayName = name || '尚未設定名稱';
    return (
      <View className="px-5 py-3 border-b border-gray-100 flex-row items-center">
        <View
          style={{
            width: SHEET_ROW_AVATAR,
            height: SHEET_ROW_AVATAR,
            borderRadius: SHEET_ROW_AVATAR / 2,
            overflow: 'hidden',
            backgroundColor: '#D1FAE5',
            marginRight: 12,
          }}
        >
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Ionicons name="person" size={26} color="#047857" />
            </View>
          )}
        </View>
        <Text className="text-base font-semibold text-gray-900 flex-1" numberOfLines={2}>
          {displayName}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={{ alignItems: 'center', maxWidth: windowWidth - 140, paddingVertical: 2 }}>
        <Text className="text-base font-semibold text-gray-900 text-center" numberOfLines={1}>
          {title}
        </Text>
        {isShared && stackMembers.length > 0 ? (
          <Pressable
            onPress={openSheet}
            hitSlop={8}
            className="mt-1 flex-row items-center justify-center"
            accessibilityLabel="查看分享成員"
          >
            <View className="flex-row items-center justify-center" style={{ paddingLeft: AVATAR_OVERLAP }}>
              {stackMembers.map((m, i) => (
                <View
                  key={m.email || String(i)}
                  style={{
                    marginLeft: i === 0 ? -AVATAR_OVERLAP : -AVATAR_OVERLAP,
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: AVATAR_SIZE / 2,
                    overflow: 'hidden',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    backgroundColor: '#D1FAE5',
                  }}
                >
                  {m.avatar ? (
                    <Image
                      source={{ uri: m.avatar }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-full h-full items-center justify-center">
                      <Ionicons name="person" size={16} color="#047857" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </Pressable>
        ) : null}
      </View>

      <ActionSheet
        ref={sheetRef}
        gestureEnabled
        closable
        defaultOverlayOpacity={0.45}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: Math.min(windowHeight * 0.5, 420),
        }}
      >
        <View className="pb-2" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <View className="px-5 py-3 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900">分享成員</Text>
          </View>
          <FlatList
            data={members}
            keyExtractor={(item, i) => item.email || String(i)}
            renderItem={renderSheetRow}
            style={{ maxHeight: 320 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </ActionSheet>
    </>
  );
}
