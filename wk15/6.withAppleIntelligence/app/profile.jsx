import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Animated from 'react-native-reanimated';
import { logout } from '../services/authService';
import { updateUserProfile } from '../services/userService';
import { useUserStore } from '../store/useUserStore';
import { useAnimatedThemeBackground, useThemeColor } from '../hooks/useTheme';
import ThemedText from '../components/ThemedText';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const isLoggedIn = Boolean(user?.uid);
  const [userName, setUserName] = useState(user?.userName ?? '');
  const [avatar, setAvatar] = useState(user?.avatar ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const screenStyle = useAnimatedThemeBackground('screen');
  const surfaceStyle = useAnimatedThemeBackground('surface');
  const borderColor = useThemeColor('border');
  const textColor = useThemeColor('text');
  const textMutedColor = useThemeColor('textMuted');

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

  const handlePickAvatar = async () => {
    if (!isLoggedIn || isSaving) return;

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('需要權限', '請允許相簿權限以選擇照片');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (pickerResult.canceled) {
      return;
    }

    const asset = pickerResult.assets?.[0];
    if (!asset?.base64) {
      Alert.alert('選圖失敗', '無法讀取照片資料，請再試一次');
      return;
    }

    const mimeType = asset.mimeType || 'image/jpeg';
    setAvatar(`data:${mimeType};base64,${asset.base64}`);
  };

  const handleSaveProfile = async () => {
    if (!isLoggedIn || !user?.uid) return;
    const nextUserName = userName.trim();
    if (!nextUserName) {
      Alert.alert('錯誤', '請輸入用戶名稱');
      return;
    }

    setIsSaving(true);
    const result = await updateUserProfile(user.uid, {
      userName: nextUserName,
      avatar: avatar || null,
    });
    setIsSaving(false);

    if (!result.success) {
      Alert.alert('更新失敗', result.error || '請稍後再試');
      return;
    }

    setUser({ userName: nextUserName, avatar: avatar || null });
    Alert.alert('成功', '用戶資料已更新');
  };

  return (
    <Animated.View className="flex-1" style={screenStyle}>
      <Stack.Screen
        options={{
          title: '用戶資訊',
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
          <View className="relative mb-4">
            <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center overflow-hidden">
              {avatar ? (
                <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <Ionicons name="person" size={64} color="#9CA3AF" />
              )}
            </View>
          {isLoggedIn && (
            <Pressable
              onPress={handlePickAvatar}
              disabled={isSaving}
              className={`absolute right-0 bottom-0 w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 ${
                isSaving ? 'opacity-60' : ''
              }`}
              style={({ pressed }) => ({
                opacity: pressed && !isSaving ? 0.7 : 1,
              })}
            >
              <Ionicons name="camera" size={20} color="#374151" />
            </Pressable>
          )}
          </View>
        </View>
        {isLoggedIn && (
          <View className="items-center -mt-4 mb-4">
            <ThemedText colorKey="textMuted" className="text-sm">
              點擊相機可更換頭像
            </ThemedText>
          </View>
        )}

        <Animated.View className="mx-4 mb-4 rounded-xl overflow-hidden" style={surfaceStyle}>
          <View className="px-4 py-4" style={{ borderBottomWidth: 1, borderBottomColor: borderColor }}>
            <ThemedText colorKey="textMuted" className="text-sm mb-1">
              用戶名稱
            </ThemedText>
            {isLoggedIn ? (
              <TextInput
                className="border rounded-lg px-3 text-base"
                placeholder="請輸入用戶名稱"
                placeholderTextColor={textMutedColor}
                value={userName}
                onChangeText={setUserName}
                editable={!isSaving}
                autoCapitalize="words"
                style={{
                  borderColor,
                  color: textColor,
                  paddingTop: 8,
                  paddingBottom: 10,
                  minHeight: 44,
                }}
              />
            ) : (
              <ThemedText className="text-base">—</ThemedText>
            )}
          </View>
          <View className="px-4 py-4" style={{ borderBottomWidth: 1, borderBottomColor: borderColor }}>
            <ThemedText colorKey="textMuted" className="text-sm mb-1">
              UID
            </ThemedText>
            <ThemedText className="text-base">{user?.uid ?? '—'}</ThemedText>
          </View>
          <View className="px-4 py-4">
            <ThemedText colorKey="textMuted" className="text-sm mb-1">
              Email
            </ThemedText>
            <ThemedText className="text-base">{user?.email ?? '—'}</ThemedText>
          </View>
        </Animated.View>

        {isLoggedIn && (
          <View className="mx-4 mb-4">
            <Pressable
              onPress={handleSaveProfile}
              disabled={isSaving}
              className={isSaving ? 'opacity-60' : ''}
              style={({ pressed }) => ({
                opacity: pressed && !isSaving ? 0.7 : 1,
              })}
            >
              <Animated.View className="rounded-xl px-4 py-4 items-center" style={surfaceStyle}>
                {isSaving ? (
                  <ActivityIndicator color={textColor} />
                ) : (
                  <ThemedText className="text-base font-medium">儲存用戶資料</ThemedText>
                )}
              </Animated.View>
            </Pressable>
          </View>
        )}

        <View className="mx-4">
          <Pressable
            onPress={isLoggedIn ? handleLogout : handleLogin}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Animated.View className="rounded-xl px-4 py-4 items-center" style={surfaceStyle}>
              <Text className={`text-base font-medium ${isLoggedIn ? 'text-red-600' : 'text-blue-600'}`}>
                {isLoggedIn ? '登出' : '登入'}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
