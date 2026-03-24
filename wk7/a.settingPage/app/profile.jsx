import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';

// 假数据
const mockUser = {
  name: '張三',
  email: 'zhangsan@example.com',
  avatar: null, // 暂时使用占位符
};

const isLoggedIn = true; // 假数据：假设用户已登录

export default function ProfileScreen() {
  const router = useRouter();

  const handleEditPhoto = () => {
    // TODO: 实现编辑照片功能
    console.log('编辑照片按钮被点击');
  };

  const handleLogout = () => {
    // TODO: 实现登出功能
    console.log('登出按钮被点击');
  };

  const handleLogin = () => {
    // TODO: 实现登入功能
    console.log('登入按钮被点击');
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
            {mockUser.avatar ? (
              <Image
                source={{ uri: mockUser.avatar }}
                className="w-32 h-32 rounded-full"
                style={{ width: 128, height: 128 }}
              />
            ) : (
              <Ionicons name="person" size={64} color="#9CA3AF" />
            )}
          </View>
        </View>

        {/* 用户信息区域 */}
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-4 border-b border-gray-100">
            <Text className="text-sm text-gray-500 mb-1">名稱</Text>
            <Text className="text-base text-gray-900">{mockUser.name}</Text>
          </View>
          <View className="px-4 py-4">
            <Text className="text-sm text-gray-500 mb-1">Email</Text>
            <Text className="text-base text-gray-900">{mockUser.email}</Text>
          </View>
        </View>

        {/* 编辑照片按钮 */}
        <View className="mx-4 mb-4">
          <Pressable
            onPress={handleEditPhoto}
            className="bg-white rounded-xl px-4 py-4 items-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className="text-base font-medium text-blue-600">編輯照片</Text>
          </Pressable>
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
