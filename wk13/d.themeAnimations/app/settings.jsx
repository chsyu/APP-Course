import React from 'react';
import { View, ScrollView, Pressable, Image, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useUserStore } from '../store/useUserStore';
import { useThemeStore } from '../store/useThemeStore';
import { useThemeColor, useAnimatedThemeBackground } from '../hooks/useTheme';
import ThemedText from '../components/ThemedText';

export default function SettingsScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const isDark = useThemeStore((s) => s.scheme === 'dark');
  const isReady = useThemeStore((s) => s.isReady);
  const setDarkMode = useThemeStore((s) => s.setDarkMode);
  const chevronColor = useThemeColor('chevron');

  const screenStyle = useAnimatedThemeBackground('screen');
  const surfaceStyle = useAnimatedThemeBackground('surface');

  const isLoggedIn = Boolean(user?.uid);

  const accountTitle = isLoggedIn
    ? (user.userName?.trim() ? user.userName : '用戶')
    : '未登入';

  const avatarUri = isLoggedIn ? user.avatar : null;

  const handleProfilePress = () => {
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const handleCloudSyncPress = () => {
    router.push('/backup');
  };

  const handleThemeToggle = (value) => {
    setDarkMode(value);
  };

  return (
    <Animated.View className="flex-1" style={screenStyle}>
      <Stack.Screen
        options={{
          title: '設定',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View className="mx-4 mb-4 rounded-xl overflow-hidden" style={surfaceStyle}>
          <Pressable
            onPress={handleProfilePress}
            className="flex-row items-center px-4 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center mr-4">
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  className="w-16 h-16 rounded-full"
                  style={{ width: 64, height: 64 }}
                />
              ) : (
                <Ionicons name="person" size={32} color="#9CA3AF" />
              )}
            </View>

            <View className="flex-1">
              <ThemedText className="text-base font-medium">{accountTitle}</ThemedText>
            </View>

            <Ionicons name="chevron-forward" size={20} color={chevronColor} />
          </Pressable>
        </Animated.View>

        <Animated.View className="mx-4 mb-4 rounded-xl overflow-hidden" style={surfaceStyle}>
          <Pressable
            onPress={handleCloudSyncPress}
            className="flex-row items-center justify-between px-4 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ThemedText className="text-base">雲端同步</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={chevronColor} />
          </Pressable>
        </Animated.View>

        <Animated.View className="mx-4 rounded-xl overflow-hidden" style={surfaceStyle}>
          <View className="flex-row items-center justify-between px-4 py-4">
            <ThemedText className="text-base">{isDark ? '深色模式' : '淺色模式'}</ThemedText>
            <Switch
              value={isDark}
              onValueChange={handleThemeToggle}
              disabled={!isReady}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
}
