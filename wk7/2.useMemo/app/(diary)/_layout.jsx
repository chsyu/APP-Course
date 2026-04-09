import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { colors } from '../../utils/color';

const TABS = [
  { id: 'list', path: '/', label: '列表' },
  { id: 'stats', path: '/stats', label: '統計' },
];

export default function DiaryLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        {/* 自訂 Tab bar */}
        <View className="px-4 pt-4 pb-3">
          <View className="flex-row items-center justify-center gap-6">
            {TABS.map((tab) => {
              const isActive = tab.path === pathname;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => router.replace(tab.path)}
                  className="pb-2"
                >
                  <Text
                    className={`text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}
                    style={isActive ? { borderBottomWidth: 2, borderBottomColor: '#000' } : {}}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
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
