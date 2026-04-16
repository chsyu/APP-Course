import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';
import { logout } from '../services/authService';
import { useUserStore } from '../store/useUserStore';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const isLoggedIn = Boolean(user?.uid);

  const handleLogout = async () => {
    const result = await logout();
    if (!result.error) {
      clearUser();
      router.replace('/settings');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#F2F2F7' }}>
      <Stack.Screen
        options={{
          title: '用戶資訊',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 头像区域 */}
        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center mb-4">
            <Ionicons name="person" size={64} color="#9CA3AF" />
          </View>
        </View>

        {/* 用户信息区域 */}
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-4 border-b border-gray-100">
            <Text className="text-sm text-gray-500 mb-1">UID</Text>
            <Text className="text-base text-gray-900">{user?.uid ?? '—'}</Text>
          </View>
          <View className="px-4 py-4">
            <Text className="text-sm text-gray-500 mb-1">Email</Text>
            <Text className="text-base text-gray-900">
              {user?.email ?? '—'}
            </Text>
          </View>
        </View>

        {/* 登出/登入按钮 */}
        <View className="mx-4">
          <Pressable
            onPress={isLoggedIn ? handleLogout : handleLogin}
            className="bg-white rounded-xl px-4 py-4 items-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className={`text-base font-medium ${isLoggedIn ? 'text-red-600' : 'text-blue-600'}`}>
              {isLoggedIn ? '登出' : '登入'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
