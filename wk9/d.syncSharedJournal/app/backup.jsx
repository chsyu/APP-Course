import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO, isValid } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';
import {
  DEFAULT_JOURNAL_ID,
  upsertDiaryToFirestore,
  syncDiaryUpsert,
  isSharedJournalEntry,
  DIARY_LAST_CLOUD_SYNC_AT_KEY,
} from '../services/diarySyncService';
import { pullRemoteDiariesAndMerge } from '../services/diaryCloudPullMerge';
import { normalizeAuthEmail } from '../services/userService';

function formatSyncDisplay(isoString) {
  if (!isoString) return '尚未從雲端更新';
  try {
    const d = parseISO(isoString);
    if (!isValid(d)) return '尚未從雲端更新';
    return format(d, 'yyyy年MM月dd日 HH:mm', { locale: zhTW });
  } catch {
    return '尚未從雲端更新';
  }
}

export default function BackupScreen() {
  const user = useUserStore((s) => s.user);
  const getJournalById = useDiaryStore((s) => s.getJournalById);
  const [lastSyncLabel, setLastSyncLabel] = useState('尚未從雲端更新');
  const [syncing, setSyncing] = useState(false);

  const refreshLastSync = useCallback(async () => {
    const raw = await AsyncStorage.getItem(DIARY_LAST_CLOUD_SYNC_AT_KEY);
    setLastSyncLabel(formatSyncDisplay(raw ?? ''));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshLastSync();
    }, [refreshLastSync])
  );

  const uid = user?.uid;
  const canSync = Boolean(uid);

  const handleSyncNow = async () => {
    if (!canSync) {
      Alert.alert('無法同步', '請先登入後再同步日記。');
      return;
    }

    setSyncing(true);
    const pullResult = await pullRemoteDiariesAndMerge({ cancelled: () => false });
    if (!pullResult.success) {
      setSyncing(false);
      Alert.alert('同步失敗', pullResult.error || '從雲端拉取失敗');
      return;
    }

    const mergedLocalDiaries = useDiaryStore.getState().diaries;
    const myEmail = normalizeAuthEmail(user?.email);

    for (const diary of mergedLocalDiaries) {
      const jid =
        diary.journalId != null && String(diary.journalId) !== ''
          ? String(diary.journalId)
          : DEFAULT_JOURNAL_ID;
      const journal = getJournalById(jid);

      if (isSharedJournalEntry(journal)) {
        const author = normalizeAuthEmail(diary.createdByEmail);
        if (!myEmail || !author || author !== myEmail) {
          // 規則僅作者可寫 sharedJournals/.../diaries，回推他人日記會 permission-denied
          continue;
        }
        const pushResult = await syncDiaryUpsert(uid, diary, journal);
        if (!pushResult.success) {
          setSyncing(false);
          Alert.alert('同步失敗', pushResult.error);
          return;
        }
      } else {
        const pushResult = await upsertDiaryToFirestore(uid, diary);
        if (!pushResult.success) {
          setSyncing(false);
          Alert.alert('同步失敗', pushResult.error);
          return;
        }
      }
    }

    const iso = new Date().toISOString();
    await AsyncStorage.setItem(DIARY_LAST_CLOUD_SYNC_AT_KEY, iso);
    setLastSyncLabel(formatSyncDisplay(iso));
    setSyncing(false);

    const parts = [
      `本機共 ${mergedLocalDiaries.length} 則日記已回推雲端。`,
      pullResult.privateMerged ? '已合併私人日記。' : '私人日記拉取略過。',
      pullResult.sharedMerged ? '已合併分享日誌。' : '分享日誌拉取略過。',
    ];
    Alert.alert('同步完成', parts.join('\n'));
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#F2F2F7' }}>
      <Stack.Screen
        options={{
          title: '雲端同步',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-3">
            <Text className="text-sm text-gray-700 leading-5">
              登入後開啟 App 會自動從雲端拉取日記並合併至本地；新增、修改、刪除日記也會同步寫入
              Firestore（未登入時僅儲存在手機）。
              {'\n\n'}
              「立即同步」會從雲端拉取你的私人日記與你有權限的分享日誌（含他人新增），合併進本機後，
              再把本機每一則日記依日誌類型寫回正確的 Firestore 路徑（私人或分享），與畫面上選中哪一個日誌無關。
            </Text>
          </View>
        </View>

        <View className="mx-4 mb-6 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-3">
            <Text className="text-sm text-gray-500">上次從雲端更新</Text>
            <Text className="text-sm text-gray-700 mt-1">{lastSyncLabel}</Text>
          </View>
        </View>

        <View className="mx-4">
          <Pressable
            onPress={handleSyncNow}
            disabled={syncing || !canSync}
            className="bg-gray-500 rounded-xl py-4 px-4 items-center justify-center"
            style={({ pressed }) => ({
              opacity: !canSync || syncing ? 0.5 : pressed ? 0.85 : 1,
            })}
          >
            {syncing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-medium text-white">立即同步</Text>
            )}
          </Pressable>
          {!canSync ? (
            <Text className="text-sm text-gray-500 mt-3 text-center">
              登入後即可與雲端同步日記
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
