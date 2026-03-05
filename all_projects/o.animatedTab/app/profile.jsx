import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';
import { signOut } from '../services/authService';
import { pickImageAndConvertToBase64 } from '../utils/photoHandler';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, updateUserProfile, clearUser, isLoading } = useUserStore();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleEditPhoto = async () => {
    if (!isAuthenticated) {
      Alert.alert('提示', '請先登入');
      router.push('/login');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      
      // 选择并转换图片为 base64
      const result = await pickImageAndConvertToBase64();
      
      if (result.cancelled) {
        return;
      }

      if (!result.base64) {
        Alert.alert('錯誤', '選擇圖片失敗');
        return;
      }

      // 确保 base64 字符串包含 data URI 前缀
      const imageBase64 = result.base64.startsWith('data:image') 
        ? result.base64 
        : `data:image/jpeg;base64,${result.base64}`;

      // 更新用户头像
      const updateResult = await updateUserProfile({ avatar: imageBase64 });
      
      if (updateResult.success) {
        Alert.alert('成功', '頭像已更新');
      } else {
        Alert.alert('錯誤', updateResult.error || '更新頭像失敗');
      }
    } catch (error) {
      console.error('編輯照片失敗:', error);
      Alert.alert('錯誤', '編輯照片時發生錯誤');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '確認登出',
      '確定要登出嗎？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '登出',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await signOut();
              if (result.error) {
                Alert.alert('錯誤', result.error);
              } else {
                clearUser();
                router.replace('/login');
              }
            } catch (error) {
              console.error('登出失敗:', error);
              Alert.alert('錯誤', '登出時發生錯誤');
            }
          },
        },
      ]
    );
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
        {isAuthenticated && user ? (
          <>
            {/* 头像区域 */}
            <View className="items-center mb-8">
              <View className="w-40 h-40 rounded-full bg-gray-300 items-center justify-center mb-4" style={{ position: 'relative' }}>
                <View className="w-40 h-40 rounded-full overflow-hidden">
                  {user.avatar ? (
                    <Image
                      source={{ uri: user.avatar }}
                      className="w-40 h-40 rounded-full"
                      style={{ width: 160, height: 160 }}
                    />
                  ) : (
                    <Ionicons name="person" size={80} color="#9CA3AF" />
                  )}
                </View>
                {/* 相机图标按钮 */}
                <Pressable
                  onPress={handleEditPhoto}
                  disabled={isUploadingPhoto || isLoading}
                  className="absolute w-10 h-10 rounded-full bg-gray-700 items-center justify-center border-2 border-white"
                  style={({ pressed }) => ({
                    bottom: 2,
                    right: 2,
                    opacity: (isUploadingPhoto || isLoading) ? 0.5 : (pressed ? 0.7 : 1),
                  })}
                >
                  {isUploadingPhoto ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Ionicons name="camera" size={20} color="#FFFFFF" />
                  )}
                </Pressable>
              </View>
            </View>

            {/* 用户信息区域 */}
            <View className="mx-4 mb-4 bg-white rounded-xl overflow-hidden">
              <View className="px-4 py-4 border-b border-gray-100">
                <Text className="text-sm text-gray-500 mb-1">名稱</Text>
                <Text className="text-base text-gray-900">{user.displayName || '未設定'}</Text>
              </View>
              <View className="px-4 py-4">
                <Text className="text-sm text-gray-500 mb-1">Email</Text>
                <Text className="text-base text-gray-900">{user.email || '未設定'}</Text>
              </View>
            </View>

            {/* 登出按钮 */}
            <View className="mx-4">
              <Pressable
                onPress={handleLogout}
                disabled={isLoading}
                className={`bg-white rounded-xl px-4 py-4 items-center ${isLoading ? 'opacity-50' : ''}`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text className="text-base font-medium text-red-600">登出</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            {/* 未登录状态 */}
            <View className="items-center mb-8">
              <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center mb-4">
                <Ionicons name="person" size={64} color="#9CA3AF" />
              </View>
            </View>

            <View className="mx-4 mb-4 bg-white rounded-xl px-4 py-8 items-center">
              <Text className="text-base text-gray-600 mb-4">請先登入以查看用戶資訊</Text>
            </View>

            {/* 登入按钮 */}
            <View className="mx-4">
              <Pressable
                onPress={handleLogin}
                className="bg-gray-600 rounded-xl px-4 py-4 items-center"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text className="text-base font-medium text-white">登入</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

