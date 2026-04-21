import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const isLoggedIn = Boolean(user?.uid);

  const [userName, setUserName] = useState(user?.userName ?? '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setUserName(user?.userName ?? '');
  }, [user?.uid, user?.userName]);

  const handleLogout = () => {
    clearUser();
    router.replace('/settings');
  };

  const handleSaveProfile = async () => {
    if (!isLoggedIn || !user?.uid) return;
    const nextUserName = userName.trim();
    if (!nextUserName) {
      Alert.alert('錯誤', '請輸入用戶名稱');
      return;
    }
    setUser({ userName: nextUserName });
    Alert.alert('成功', '用戶資料已更新');
  };

  return (
    <View className='flex-1' style={{ backgroundColor: '#F2F2F7' }}>
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
        className='flex-1'
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='items-center mb-8'>
          <View className='relative mb-4'>
            <View className='w-32 h-32 rounded-full bg-gray-300 items-center justify-center overflow-hidden'>
              <Ionicons name='person' size={64} color='#9CA3AF' />
            </View>
          </View>
        </View>

        <View className='mx-4 mb-4 bg-white rounded-xl overflow-hidden'>
          <View className='px-4 py-4 border-b border-gray-100'>
            <Text className='text-sm text-gray-500 mb-1'>用戶名稱</Text>
            {isLoggedIn ? (
              <>
                <TextInput
                  className='border border-gray-300 rounded-lg px-3 text-base text-gray-900'
                  placeholder='請輸入用戶名稱'
                  value={userName}
                  onChangeText={setUserName}
                  editable={!isSaving}
                  autoCapitalize='words'
                  style={{
                    paddingTop: 8,
                    paddingBottom: 10,
                    minHeight: 44,
                  }}
                />
                <Text className='text-xs text-gray-400 mt-2'>
                  修改後請點擊下方「儲存用戶資料」
                </Text>
              </>
            ) : (
              <Text className='text-base text-gray-900'>—</Text>
            )}
          </View>
          <View className='px-4 py-4 border-b border-gray-100'>
            <Text className='text-sm text-gray-500 mb-1'>UID</Text>
            <Text className='text-base text-gray-900'>{user?.uid ?? '—'}</Text>
          </View>
          <View className='px-4 py-4'>
            <Text className='text-sm text-gray-500 mb-1'>Email</Text>
            <Text className='text-base text-gray-900'>{user?.email ?? '—'}</Text>
          </View>
        </View>

        {isLoggedIn && (
          <View className='mx-4 mb-4'>
            <Pressable
              onPress={handleSaveProfile}
              disabled={isSaving}
              className={'bg-white rounded-xl px-4 py-4 items-center ' + (isSaving ? 'opacity-60' : '')}
              style={({ pressed }) => ({
                opacity: pressed && !isSaving ? 0.7 : 1,
              })}
            >
              {isSaving ? (
                <ActivityIndicator color='#374151' />
              ) : (
                <Text className='text-base font-medium text-gray-900'>儲存用戶資料</Text>
              )}
            </Pressable>
          </View>
        )}

        <View className='mx-4'>
          <Pressable
            onPress={handleLogout}
            className='bg-white rounded-xl px-4 py-4 items-center'
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className='text-base font-medium text-red-600'>登出</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
