import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';

export default function SettingsScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const [isDarkMode, setIsDarkMode] = useState(false); // 假数据：主题状态

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

  const handleBackupPress = () => {
    router.push('/backup');
  };

  const handleThemeToggle = (value) => {
    setIsDarkMode(value);
    // TODO: 实现主题切换功能
    console.log('主题切换:', value ? 'Dark' : 'Light');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#F2F2F7' }}>
      <Stack.Screen
        options={{
          title: '設定',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 账户区域 */}
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <Pressable
            onPress={handleProfilePress}
            className="flex-row items-center px-4 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            {/* 头像 */}
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

            {/* 账户信息 */}
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                {accountTitle}
              </Text>
            </View>

            {/* 右箭头 */}
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </Pressable>
        </View>

        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <Pressable
            onPress={handleBackupPress}
            className="flex-row items-center justify-between px-4 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className="text-base text-gray-900">備份</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </Pressable>
        </View>

        {/* 主题区域 */}
        <View className="mx-4 bg-white rounded-xl overflow-hidden">
          <View className="flex-row items-center justify-between px-4 py-4">
            <Text className="text-base text-gray-900">外觀</Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
