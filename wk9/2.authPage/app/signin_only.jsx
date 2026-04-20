import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { z } from 'zod';
import { colors } from '../utils/color';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '請輸入郵箱' })
    .email('請輸入有效的郵箱格式'),
  password: z
    .string()
    .min(1, { message: '請輸入密碼' })
    .min(6, { message: '密碼長度至少6個字符' }),
});

export default function SignInOnlyScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const payload = {
      email: email.trim(),
      password,
    };

    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      const firstMessage = result.error.issues[0]?.message || '請檢查輸入';
      Alert.alert('錯誤', firstMessage);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      router.dismissTo('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: colors.primary }}
    >
      <Stack.Screen
        options={{
          title: '登入',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white rounded-xl p-6 mb-6">
          <View className="mb-4">
            <Text className="text-sm text-gray-600 mb-2">郵箱</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 text-base"
              placeholder="請輸入郵箱"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              style={{
                paddingTop: 8,
                paddingBottom: 12,
                minHeight: 48,
              }}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm text-gray-600 mb-2">密碼</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-lg px-4 pr-12 text-base"
                placeholder="請輸入密碼"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isLoading}
                style={{
                  paddingTop: 8,
                  paddingBottom: 12,
                  minHeight: 48,
                }}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-0 bottom-0 justify-center"
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            className={`bg-gray-600 rounded-lg py-4 items-center ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-semibold">登入</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
