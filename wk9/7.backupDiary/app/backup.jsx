import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO, isValid } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';
import { backupDiariesToFirestore } from '../services/diaryBackupService';

export const DIARY_LAST_BACKUP_AT_KEY = '@diary_last_backup_at';

function formatBackupDisplay(isoString) {
  if (!isoString) return '尚未備份';
  try {
    const d = parseISO(isoString);
    if (!isValid(d)) return '尚未備份';
    return format(d, 'yyyy年MM月dd日 HH:mm', { locale: zhTW });
  } catch {
    return '尚未備份';
  }
}

export default function SyncScreen() {
  const user = useUserStore((s) => s.user);
  const diaries = useDiaryStore((s) => s.diaries);
  const [lastBackupLabel, setLastBackupLabel] = useState('尚未備份');
  const [backingUp, setBackingUp] = useState(false);

  useEffect(() => {
    const loadLastBackup = async () => {
      const raw = await AsyncStorage.getItem(DIARY_LAST_BACKUP_AT_KEY);
      setLastBackupLabel(formatBackupDisplay(raw ?? ''));
    };
    loadLastBackup();
  }, []);

  const uid = user?.uid;
  const canBackup = Boolean(uid);

  const handleBackup = async () => {
    if (!canBackup) {
      Alert.alert('無法備份', '請先登入後再備份日記到雲端。');
      return;
    }
    setBackingUp(true);
    const result = await backupDiariesToFirestore(uid, diaries);
    setBackingUp(false);

    if (result.success) {
      const iso = new Date().toISOString();
      await AsyncStorage.setItem(DIARY_LAST_BACKUP_AT_KEY, iso);
      setLastBackupLabel(formatBackupDisplay(iso));
      Alert.alert('備份完成', `已上傳 ${diaries.length} 則日記。`);
    } else {
      Alert.alert('備份失敗', result.error);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#F2F2F7' }}>
      <Stack.Screen
        options={{
          title: '備份',
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
        <View className="mx-4 mb-6 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-3">
            <Text className="text-sm text-gray-500">上次備份時間</Text>
            <Text className="text-sm text-gray-700 mt-1">{lastBackupLabel}</Text>
          </View>
        </View>

        <View className="mx-4">
          <Pressable
            onPress={handleBackup}
            disabled={backingUp || !canBackup}
            className="bg-gray-500 rounded-xl py-4 px-4 items-center justify-center"
            style={({ pressed }) => ({
              opacity: !canBackup || backingUp ? 0.5 : pressed ? 0.85 : 1,
            })}
          >
            {backingUp ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-medium text-white">立即備份</Text>
            )}
          </Pressable>
          {!canBackup ? (
            <Text className="text-sm text-gray-500 mt-3 text-center">
              登入後即可將本地日記備份至 Firestore
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
