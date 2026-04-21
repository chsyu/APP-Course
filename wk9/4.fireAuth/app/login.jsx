import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { colors } from '../utils/color';
import { loginSchema, signupSchema } from '../utils/authSchemas';
import { signIn, signUp } from '../services/authService';
import { useUserStore } from '../store/useUserStore';
import { EmailField, PasswordField } from '../components/auth/AuthFields';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);

  const validateForm = () => {
    const payload =
      mode === 'signup'
        ? {
          email: email.trim(),
          password,
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
    try {
      const result =
        mode === 'login'
          ? await signIn(email.trim(), password)
          : await signUp(email.trim(), password);
      if (!result.user) {
        Alert.alert(
          mode === 'login' ? '登入失敗' : '註冊失敗',
          result.error || '請檢查您的郵箱和密碼'
        );
        return;
      }

      setUser({
        uid: result.user.uid,
        email: result.user.email ?? email.trim(),
      });
      router.dismissTo('/');
    } catch (_error) {
      Alert.alert('錯誤', '登入時發生錯誤，請重試');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <Stack.Screen
        options={{
          title: mode === 'login' ? '登入' : '註冊',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <KeyboardAwareScrollView
        bottomOffset={40}
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View className="flex-row mb-8 justify-center">
          <Pressable
            onPress={() => setMode('login')}
            className={`px-6 py-2 rounded-full ${mode === 'login' ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            <Text className={`text-base font-medium ${mode === 'login' ? 'text-white' : 'text-gray-700'}`}>
              登入
            </Text>
          </Pressable>
          <View className="w-4" />
          <Pressable
            onPress={() => setMode('signup')}
            className={`px-6 py-2 rounded-full ${mode === 'signup' ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            <Text className={`text-base font-medium ${mode === 'signup' ? 'text-white' : 'text-gray-700'}`}>
              註冊
            </Text>
          </Pressable>
        </View>

        <View className="bg-white rounded-xl p-6 mb-6">
          <EmailField
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />

          <PasswordField
            label="密碼"
            placeholder="請輸入密碼"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
            editable={!isLoading}
          />

          {mode === 'signup' && (
            <PasswordField
              label="確認密碼"
              placeholder="請再次輸入密碼"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              showPassword={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              editable={!isLoading}
            />
          )}

          <Pressable
            onPress={handleAuth}
            disabled={isLoading}
            className={`bg-gray-600 rounded-lg py-4 items-center ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-semibold">
                {mode === 'login' ? '登入' : '註冊'}
              </Text>
            )}
          </Pressable>
        </View>
        {/* 提示信息 */}
        <Text className="text-sm text-gray-500 text-center">
          {mode === 'login'
            ? '還沒有帳號？點擊上方「註冊」按鈕'
            : '已有帳號？點擊上方「登入」按鈕'}
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
}

