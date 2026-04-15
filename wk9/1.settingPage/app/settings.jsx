import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';

const mockUser = {
  name: '張三',
  email: 'zhangsan@example.com',
  avatar: null, 
};

const mockLastSyncTime = '2024年01月15日 14:30';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false); // 假数据：主题状态

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSyncPress = () => {
    console.log('Sync is clicked!');
  };

  const handleThemeToggle = (value) => {
    setIsDarkMode(value);
    console.log('Theme is toggled:', value ? 'Dark' : 'Light');
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
        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <Pressable
            onPress={handleProfilePress}
            className="flex-row items-center px-4 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center mr-4">
              {mockUser.avatar ? (
                <Image
                  source={{ uri: mockUser.avatar }}
                  className="w-16 h-16 rounded-full"
                  style={{ width: 64, height: 64 }}
                />
              ) : (
                <Ionicons name="person" size={32} color="#9CA3AF" />
              )}
            </View>

            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                {mockUser.name}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </Pressable>
        </View>

        <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
          <Pressable
            onPress={handleSyncPress}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className="text-base text-gray-900">同步</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </Pressable>
          <View className="px-4 py-3">
            <Text className="text-sm text-gray-500">上次同步時間</Text>
            <Text className="text-sm text-gray-700 mt-1">{mockLastSyncTime}</Text>
          </View>
        </View>

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
