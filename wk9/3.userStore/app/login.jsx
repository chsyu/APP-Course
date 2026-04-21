import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { z } from 'zod';
import { colors } from '../utils/color';
import { useUserStore } from '../store/useUserStore';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '請輸入郵箱' })
    .email({ message: '請輸入有效的郵箱格式' }),
  password: z
    .string()
    .min(1, { message: '請輸入密碼' })
    .min(6, { message: '密碼長度至少6個字符' }),
});

const signupSchema = loginSchema
  .extend({
    userName: z.string().min(1, { message: '請輸入名稱' }),
    confirmPassword: z.string().min(1, { message: '請輸入密碼' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  });

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setUser = useUserStore((s) => s.setUser);

  const validateForm = () => {
    const payload =
      mode === 'signup'
        ? {
          email: email.trim(),
          password,
          userName: userName.trim(),
          confirmPassword,
        }
        : {
          email: email.trim(),
          password,
        };

    const result =
      mode === 'signup'
        ? signupSchema.safeParse(payload)
        : loginSchema.safeParse(payload);

    if (!result.success) {
      const firstMessage = result.error.issues[0]?.message || '請檢查輸入';
      Alert.alert('錯誤', firstMessage);
      return false;
    }

    return true;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const normalizedEmail = email.trim();
    const localUid = 'local-uid';

    if (mode === 'login') {
      setUser({
        uid: localUid,
        email: normalizedEmail,
      });
    } else {
      setUser({
        uid: localUid,
        email: normalizedEmail,
        userName: userName.trim(),
        avatar: null,
      });
    }
    router.dismissTo('/');
    setIsLoading(false);

  };

  return (
    <View className='flex-1' style={{ backgroundColor: colors.primary }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: mode === 'login' ? '登入' : '註冊',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <KeyboardAwareScrollView
        bottomOffset={40}
        className='flex-1'
        contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View className='flex-row mb-8 justify-center'>
          <Pressable
            onPress={() => setMode('login')}
            className={
              'px-6 py-2 rounded-full ' + (mode === 'login' ? 'bg-gray-600' : 'bg-gray-200')
            }
          >
            <Text
              className={
                'text-base font-medium ' + (mode === 'login' ? 'text-white' : 'text-gray-700')
              }
            >
              登入
            </Text>
          </Pressable>
          <View className='w-4' />
          <Pressable
            onPress={() => setMode('signup')}
            className={
              'px-6 py-2 rounded-full ' + (mode === 'signup' ? 'bg-gray-600' : 'bg-gray-200')
            }
          >
            <Text
              className={
                'text-base font-medium ' + (mode === 'signup' ? 'text-white' : 'text-gray-700')
              }
            >
              註冊
            </Text>
          </Pressable>
        </View>

        <View className='bg-white rounded-xl p-6 mb-6'>
          {mode === 'signup' && (
            <View className='mb-4'>
              <Text className='text-sm text-gray-600 mb-2'>用戶名稱</Text>
              <TextInput
                className='border border-gray-300 rounded-lg px-4 text-base'
                placeholder='請輸入名稱'
                value={userName}
                onChangeText={setUserName}
                autoCapitalize='words'
                editable={!isLoading}
                style={{
                  paddingTop: 8,
                  paddingBottom: 12,
                  minHeight: 48,
                }}
              />
            </View>
          )}

          <View className='mb-4'>
            <Text className='text-sm text-gray-600 mb-2'>郵箱</Text>
            <TextInput
              className='border border-gray-300 rounded-lg px-4 text-base'
              placeholder='請輸入郵箱'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              editable={!isLoading}
              style={{
                paddingTop: 8,
                paddingBottom: 12,
                minHeight: 48,
              }}
            />
          </View>

          <View className='mb-4'>
            <Text className='text-sm text-gray-600 mb-2'>密碼</Text>
            <View className='relative'>
              <TextInput
                className='border border-gray-300 rounded-lg px-4 pr-12 text-base'
                placeholder='請輸入密碼'
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
                className='absolute right-4 top-0 bottom-0 justify-center'
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color='#6B7280'
                />
              </Pressable>
            </View>
          </View>

          {mode === 'signup' && (
            <View className='mb-4'>
              <Text className='text-sm text-gray-600 mb-2'>確認密碼</Text>
              <View className='relative'>
                <TextInput
                  className='border border-gray-300 rounded-lg px-4 pr-12 text-base'
                  placeholder='請再次輸入密碼'
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    minHeight: 48,
                    lineHeight: 24,
                  }}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-4 top-0 bottom-0 justify-center'
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color='#6B7280'
                  />
                </Pressable>
              </View>
            </View>
          )}

          <Pressable
            onPress={handleAuth}
            disabled={isLoading}
            className={'bg-gray-600 rounded-lg py-4 items-center ' + (isLoading ? 'opacity-50' : '')}
          >
            {isLoading ? (
              <ActivityIndicator color='#FFFFFF' />
            ) : (
              <Text className='text-white text-base font-semibold'>
                {mode === 'login' ? '登入' : '註冊'}
              </Text>
            )}
          </Pressable>
        </View>

        <Text className='text-sm text-gray-500 text-center'>
          {mode === 'login'
            ? '還沒有帳號？點擊上方「註冊」按鈕'
            : '已有帳號？點擊上方「登入」按鈕'}
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
}
