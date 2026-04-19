import '../global.css';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../utils/color';
import AuthBootstrap from '../components/AuthBootstrap';
import DiarySyncBootstrap from '../components/DiarySyncBootstrap';
import JournalPickerSheet from '../components/JournalPickerSheet';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';

function DiaryJournalHeaderMenu() {
  const openJournalSheet = useDiaryStore((s) => s.openJournalSheet);
  return (
    <Pressable onPress={() => openJournalSheet()} hitSlop={12} style={{ marginLeft: 12 }}>
      <Ionicons name="menu" size={26} color="#000" />
    </Pressable>
  );
}

/** 標題列右側：在元件內使用 useRouter，避免 RootLayout 把 router 放進 useMemo 依賴導致 options 每輪都是新物件 → 導覽無限 setState */
function DiaryStackHeaderRight() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const avatar = user?.avatar;
  const isLoggedIn = Boolean(user?.uid);

  return (
    <View className="flex-row items-center gap-4">
      <Pressable onPress={() => router.push('/search')} style={{ marginRight: 0 }}>
        <Ionicons name="search" size={24} color="#000" />
      </Pressable>
      <Pressable onPress={() => router.push('/settings')} style={{ marginRight: 16 }}>
        <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
          {isLoggedIn && avatar ? (
            <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <Ionicons name="person" size={24} color="#000" />
          )}
        </View>
      </Pressable>
    </View>
  );
}

const DIARY_HEADER_STYLE = {
  backgroundColor: colors.primary,
  elevation: 0,
  shadowOpacity: 0,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 0,
};

/**
 * 必須是模組級常數：同一物件參考 + 穩定的 headerLeft/headerRight 函式，
 * 否則 RootLayout 每次 render 都會給 Stack 新的 options，觸發 navigation 內部反覆更新（Maximum update depth exceeded）。
 */
const DIARY_STACK_SCREEN_OPTIONS = {
  title: '我的日記',
  headerLeft: () => <DiaryJournalHeaderMenu />,
  headerRight: () => <DiaryStackHeaderRight />,
  headerStyle: DIARY_HEADER_STYLE,
  headerShadowVisible: false,
};

/** 避免每次 RootLayout render 都傳新 options 物件給 Stack，觸發導覽內部反覆 merge */
const LOGIN_SCREEN_OPTIONS = {
  headerStyle: DIARY_HEADER_STYLE,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal',
};

const SETTINGS_SCREEN_OPTIONS = {
  headerStyle: DIARY_HEADER_STYLE,
  headerShadowVisible: false,
};

const BACKUP_SCREEN_OPTIONS = {
  headerStyle: DIARY_HEADER_STYLE,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal',
};

const PROFILE_SCREEN_OPTIONS = {
  headerStyle: DIARY_HEADER_STYLE,
  headerShadowVisible: false,
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AuthBootstrap />
        <DiarySyncBootstrap />
        <Stack>
          <Stack.Screen name="(diary)" options={DIARY_STACK_SCREEN_OPTIONS} />
          <Stack.Screen name="login" options={LOGIN_SCREEN_OPTIONS} />
          <Stack.Screen name="settings" options={SETTINGS_SCREEN_OPTIONS} />
          <Stack.Screen name="backup" options={BACKUP_SCREEN_OPTIONS} />
          <Stack.Screen name="profile" options={PROFILE_SCREEN_OPTIONS} />
          <Stack.Screen name="diary/[id]" />
        </Stack>
        <JournalPickerSheet />
        <StatusBar style="auto" />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
