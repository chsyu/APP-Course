import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';

// 假数据
const mockUser = {
  name: '張三',
  email: 'zhangsan@example.com',
  avatar: null, 
};

export default function ProfileScreen() {

  const handleLogout = () => {
    console.log('Logout is clicked!');
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

        <View className="mx-4">
          <Pressable
            onPress={handleLogout}
            className="bg-white rounded-xl px-4 py-4 items-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className={`text-base font-medium text-red-600`}>
              登出
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
