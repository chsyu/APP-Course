import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { colors } from '../../utils/color';

export default function DiaryLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const isList = pathname === '/' || pathname === '/(diary)';

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        {/* 自訂 Tab bar */}
        <View className="px-4 pt-4 pb-3">
          <View className="flex-row items-center justify-center gap-6">
            <Pressable
              onPress={() => router.replace('/')}
              className="pb-2"
            >
              <Text
                className={`text-base font-medium ${isList ? 'text-gray-900' : 'text-gray-600'}`}
                style={isList ? { borderBottomWidth: 2, borderBottomColor: '#000' } : {}}
              >
                列表
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/stats')}
              className="pb-2"
            >
              <Text
                className={`text-base font-medium ${!isList ? 'text-gray-900' : 'text-gray-600'}`}
                style={!isList ? { borderBottomWidth: 2, borderBottomColor: '#000' } : {}}
              >
                統計
              </Text>
            </Pressable>
          </View>
          {/* 分隔線 */}
          <View className="border-b border-gray-200 mt-2" style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }} />
        </View>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="stats" />
        </Stack>
      </View>
    </View>
  );
}
