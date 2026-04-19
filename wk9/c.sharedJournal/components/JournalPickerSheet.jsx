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
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDiaryStore from '../store/useDiaryStore';
import { useUserStore } from '../store/useUserStore';
import { getPublicProfileByEmail, normalizeAuthEmail } from '../services/userService';

const SCENE_LIST = 'list';
const SCENE_PICK_KIND = 'pick_kind';
const SCENE_FORM_PRIVATE = 'form_private';
const SCENE_FORM_SHARED = 'form_shared';
const SCENE_EDIT = 'edit';

function isValidEmailInput(raw) {
  const s = (raw || '').trim();
  if (s.length < 3 || s.includes(' ') || !s.includes('@')) return false;
  const [local, domain] = s.split('@');
  return Boolean(local && domain && domain.includes('.'));
}

export default function JournalPickerSheet() {
  const sheetRef = useRef(null);
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const myUid = user?.uid;
  const myEmail = useMemo(() => normalizeAuthEmail(user?.email), [user?.email]);

  const journalSheetOpen = useDiaryStore((s) => s.journalSheetOpen);
  const closeJournalSheet = useDiaryStore((s) => s.closeJournalSheet);
  const journalsRaw = useDiaryStore((s) => s.journals);
  const activeJournalId = useDiaryStore((s) => s.activeJournalId);
  const setActiveJournal = useDiaryStore((s) => s.setActiveJournal);
  const createPrivateJournal = useDiaryStore((s) => s.createPrivateJournal);
  const createSharedJournal = useDiaryStore((s) => s.createSharedJournal);
  const renameJournal = useDiaryStore((s) => s.renameJournal);
  const updateSharedJournalMembers = useDiaryStore((s) => s.updateSharedJournalMembers);
  const refreshJournalMemberSummaries = useDiaryStore((s) => s.refreshJournalMemberSummaries);

  const journals = useMemo(
    () => [...journalsRaw].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [journalsRaw]
  );

  const [scene, setScene] = useState(SCENE_LIST);
  const [nameInput, setNameInput] = useState('');
  const [editingJournalId, setEditingJournalId] = useState(null);
  const [memberEmailsDraft, setMemberEmailsDraft] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [memberLabels, setMemberLabels] = useState({});
  const [saving, setSaving] = useState(false);
  const prevSheetOpenRef = useRef(false);

  const resolveLabels = useCallback(async (emails) => {
    const entries = await Promise.all(
      (emails || []).map(async (em) => {
        const key = normalizeAuthEmail(em);
        const p = await getPublicProfileByEmail(key);
        return [key, (p?.userName || '').trim() || key];
      })
    );
    setMemberLabels((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
  }, []);

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
      setMemberEmailsDraft([]);
      setEmailInput('');
      setMemberLabels({});
      setSaving(false);
    }
  }, [journalSheetOpen]);

  useEffect(() => {
    if (scene === SCENE_FORM_SHARED || scene === SCENE_EDIT) {
      resolveLabels(memberEmailsDraft);
    }
  }, [scene, memberEmailsDraft, resolveLabels]);

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
    setMemberEmailsDraft([]);
    setEmailInput('');
    setSaving(false);
  }, []);

  const openPickKind = useCallback(() => {
    setEditingJournalId(null);
    setNameInput('');
    setMemberEmailsDraft(myEmail ? [myEmail] : []);
    setEmailInput('');
    setScene(SCENE_PICK_KIND);
  }, [myEmail]);

  const openPrivateForm = useCallback(() => {
    setNameInput('');
    setScene(SCENE_FORM_PRIVATE);
  }, []);

  const openSharedForm = useCallback(() => {
    if (!myEmail) {
      Alert.alert(
        '無法建立',
        '分享日誌需要使用 Email 登入（匿名或僅手機登入不支援）。'
      );
      return;
    }
    setNameInput('');
    setMemberEmailsDraft([myEmail]);
    setEmailInput('');
    setScene(SCENE_FORM_SHARED);
  }, [myEmail]);

  const openEdit = useCallback(
    (journal) => {
      setEditingJournalId(journal.id);
      setNameInput(journal.name ?? '');
      const kind = journal.kind ?? 'private';
      if (kind === 'shared' && Array.isArray(journal.memberEmails) && journal.memberEmails.length > 0) {
        setMemberEmailsDraft(journal.memberEmails.map((e) => normalizeAuthEmail(e)).filter(Boolean));
      } else {
        setMemberEmailsDraft([]);
      }
      setEmailInput('');
      setScene(SCENE_EDIT);
      if (kind === 'shared') {
        refreshJournalMemberSummaries(journal.id).catch(() => {});
      }
    },
    [refreshJournalMemberSummaries]
  );

  const editingJournal = useMemo(
    () => journals.find((j) => j.id === editingJournalId) ?? null,
    [journals, editingJournalId]
  );

  const isEditingShared = editingJournal?.kind === 'shared';
  const isSharedOwner = Boolean(
    myUid && editingJournal?.kind === 'shared' && editingJournal?.ownerUid === myUid
  );

  const addEmailToDraft = useCallback(() => {
    const raw = emailInput.trim();
    if (!raw) return;
    if (!isValidEmailInput(raw)) {
      Alert.alert('格式有誤', '請輸入有效的 Email 地址');
      return;
    }
    const key = normalizeAuthEmail(raw);
    if (memberEmailsDraft.some((e) => normalizeAuthEmail(e) === key)) {
      setEmailInput('');
      return;
    }
    setMemberEmailsDraft((prev) => [...prev, key]);
    setEmailInput('');
    getPublicProfileByEmail(key).then((p) => {
      const label = (p?.userName || '').trim() || key;
      setMemberLabels((prev) => ({ ...prev, [key]: label }));
    });
  }, [emailInput, memberEmailsDraft]);

  const removeEmailFromDraft = useCallback(
    (emailKey) => {
      if (emailKey === myEmail) return;
      setMemberEmailsDraft((prev) => prev.filter((e) => normalizeAuthEmail(e) !== emailKey));
    },
    [myEmail]
  );

  const confirmForm = useCallback(async () => {
    const trimmed = nameInput.trim() || '新日誌';
    if (scene === SCENE_FORM_PRIVATE) {
      createPrivateJournal(trimmed);
      goList();
      return;
    }
    if (scene === SCENE_FORM_SHARED) {
      if (!myUid || !myEmail) {
        Alert.alert('無法建立', '請先使用 Email 帳號登入');
        return;
      }
      setSaving(true);
      const others = memberEmailsDraft.filter((e) => normalizeAuthEmail(e) !== myEmail);
      const res = await createSharedJournal(trimmed, others);
      setSaving(false);
      if (!res.success) {
        Alert.alert('建立失敗', res.error || '請稍後再試');
        return;
      }
      goList();
      return;
    }
    if (scene === SCENE_EDIT && editingJournalId) {
      renameJournal(editingJournalId, trimmed);
      if (isEditingShared && isSharedOwner) {
        setSaving(true);
        const res = await updateSharedJournalMembers(editingJournalId, memberEmailsDraft);
        setSaving(false);
        if (!res.success) {
          Alert.alert('成員更新失敗', res.error || '請稍後再試');
          return;
        }
      }
      goList();
    }
  }, [
    scene,
    nameInput,
    editingJournalId,
    myUid,
    myEmail,
    memberEmailsDraft,
    createPrivateJournal,
    createSharedJournal,
    renameJournal,
    updateSharedJournalMembers,
    goList,
    isEditingShared,
    isSharedOwner,
  ]);

  const formTitle =
    scene === SCENE_FORM_PRIVATE
      ? '新增私人日誌'
      : scene === SCENE_FORM_SHARED
        ? '新增分享日誌'
        : scene === SCENE_EDIT
          ? '編輯日誌'
          : '';

  const renderMemberRow = (emailKey) => {
    const label = memberLabels[emailKey] || emailKey;
    const isSelf = emailKey === myEmail;
    const showRemove =
      (scene === SCENE_FORM_SHARED || (scene === SCENE_EDIT && isSharedOwner)) && !isSelf;
    return (
      <View
        key={emailKey}
        className="flex-row items-center justify-between py-2 border-b border-gray-100"
      >
        <View className="flex-1 mr-2" style={{ minWidth: 0 }}>
          <Text className="text-sm text-gray-500" numberOfLines={1}>
            {emailKey}
          </Text>
          <Text className="text-base text-gray-900 font-medium" numberOfLines={1}>
            {label !== emailKey ? label : '—'}
            {isSelf ? '（我）' : ''}
          </Text>
        </View>
        {showRemove ? (
          <Pressable
            onPress={() => removeEmailFromDraft(emailKey)}
            hitSlop={8}
            className="p-2"
            accessibilityLabel="移除成員"
          >
            <Ionicons name="close-circle-outline" size={22} color="#9CA3AF" />
          </Pressable>
        ) : null}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isActive = item.id === activeJournalId;
    const isShared = item.kind === 'shared';
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
          <View className="flex-row items-center gap-2 mt-1">
            {isActive ? <Text className="text-xs text-gray-500">目前使用中</Text> : null}
            {isShared ? (
              <Text className="text-xs font-medium text-emerald-700">分享</Text>
            ) : null}
          </View>
        </Pressable>
        <Pressable
          onPress={() => openEdit(item)}
          hitSlop={10}
          className="py-4 px-3 justify-center"
          accessibilityLabel="編輯日誌"
        >
          <Ionicons name="create-outline" size={22} color="#374151" />
        </Pressable>
        <View className="w-11 py-4 pr-4 items-center justify-center">
          {isActive ? <Ionicons name="checkmark-circle" size={22} color="#16A34A" /> : null}
        </View>
      </View>
    );
  };

  const showFormHeader =
    scene === SCENE_FORM_PRIVATE ||
    scene === SCENE_FORM_SHARED ||
    scene === SCENE_EDIT;

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
              <Pressable onPress={openPickKind} className="px-3 py-2 rounded-lg active:bg-gray-100">
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
        ) : scene === SCENE_PICK_KIND ? (
          <View className="flex-1 px-5 pt-6">
            <Text className="text-lg font-bold text-gray-900 mb-6">選擇日誌類型</Text>
            <Pressable
              onPress={openPrivateForm}
              className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 mb-4 active:bg-gray-100"
            >
              <Text className="text-base font-semibold text-gray-900">私人日誌</Text>
              <Text className="text-sm text-gray-500 mt-1">僅同步至你的帳號</Text>
            </Pressable>
            <Pressable
              onPress={openSharedForm}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-4 active:bg-emerald-100"
            >
              <Text className="text-base font-semibold text-gray-900">分享日誌</Text>
              <Text className="text-sm text-gray-600 mt-1">以 Email 邀請他人共同編輯</Text>
            </Pressable>
            <Pressable onPress={goList} className="mt-4 self-center py-2">
              <Text className="text-base text-gray-500">取消</Text>
            </Pressable>
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-white"
            style={{ flex: 1 }}
          >
            {showFormHeader ? (
              <View className="flex-row items-center border-b border-gray-200 px-2 pt-3 pb-3">
                <Pressable
                  onPress={goList}
                  hitSlop={12}
                  className="w-11 h-11 items-center justify-center"
                  accessibilityLabel="關閉"
                >
                  <Ionicons name="close" size={28} color="#111827" />
                </Pressable>
                <Text className="flex-1 text-center text-lg font-bold text-gray-900">
                  {formTitle}
                </Text>
                <Pressable
                  onPress={() => {
                    if (!saving) confirmForm();
                  }}
                  hitSlop={12}
                  className="w-11 h-11 items-center justify-center"
                  accessibilityLabel="確認"
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator size="small" color="#16A34A" />
                  ) : (
                    <Ionicons name="checkmark" size={28} color="#16A34A" />
                  )}
                </Pressable>
              </View>
            ) : null}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: Math.max(insets.bottom, 32),
              }}
              keyboardShouldPersistTaps="handled"
            >
              <Text className="text-sm text-gray-500 mb-2">日誌名稱</Text>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                placeholder="例如：旅遊手帳"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 mb-6"
                returnKeyType="done"
                editable={!(scene === SCENE_EDIT && isEditingShared && !isSharedOwner)}
                onSubmitEditing={() => {
                  if (scene === SCENE_FORM_PRIVATE) confirmForm();
                }}
              />

              {scene === SCENE_FORM_SHARED || (scene === SCENE_EDIT && isEditingShared) ? (
                <View className="mb-4">
                  <Text className="text-sm text-gray-500 mb-2">分享成員（Email）</Text>
                  {scene === SCENE_EDIT && isEditingShared && !isSharedOwner ? (
                    <Text className="text-xs text-gray-500 mb-2">僅擁有者可編輯成員列表</Text>
                  ) : null}
                  {(scene === SCENE_FORM_SHARED || (scene === SCENE_EDIT && isSharedOwner)) && (
                    <View className="flex-row gap-2 mb-3">
                      <TextInput
                        value={emailInput}
                        onChangeText={setEmailInput}
                        placeholder="對方 Email"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onSubmitEditing={addEmailToDraft}
                      />
                      <Pressable
                        onPress={addEmailToDraft}
                        className="bg-gray-900 rounded-xl px-4 justify-center active:opacity-80"
                      >
                        <Text className="text-white font-medium">加入</Text>
                      </Pressable>
                    </View>
                  )}
                  {memberEmailsDraft.length === 0 ? (
                    <Text className="text-sm text-gray-400 py-2">尚無成員</Text>
                  ) : (
                    memberEmailsDraft.map((e) => renderMemberRow(normalizeAuthEmail(e)))
                  )}
                </View>
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </View>
    </ActionSheet>
  );
}
