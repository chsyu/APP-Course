import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Stack } from 'expo-router';
import { colors } from '../utils/color';
import { loginSchema, signupSchema } from '../utils/authSchemas';
import { signUp, signIn } from '../services/authService';
import { createUserProfile } from '../services/userService';
import { useUserStore } from '../store/useUserStore';
import AuthModeTabs from '../components/auth/AuthModeTabs';
import {
  DisplayNameField,
  EmailField,
  PasswordField,
} from '../components/auth/AuthFields';

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

  const { setUser, syncUser } = useUserStore();

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
    try {
      if (mode === 'login') {
        const result = await signIn(email.trim(), password);
        if (!result.user) {
          Alert.alert('登入失敗', result.error || '請檢查您的郵箱和密碼');
          return;
        }
        setUser({
          uid: result.user.uid,
          email: result.user.email || email.trim(),
        });
        await syncUser();
        // Pop settings/login (etc.) so the diary root is focused; replace('/') alone only swaps the top screen.
        router.dismissTo('/');
        return;
      }

      const authResult = await signUp(email.trim(), password);
      if (!authResult.user) {
        Alert.alert('註冊失敗', authResult.error || '請檢查您的輸入');
        return;
      }
      // Ensure auth state/token is fully ready before first Firestore write.
      await authResult.authUser?.getIdToken?.(true);

      const userData = {
        email: email.trim(),
        userName: userName.trim(),
        avatar: null,
      };

      const profileResult = await createUserProfile(authResult.user.uid, userData);
      if (!profileResult.success) {
        Alert.alert('註冊失敗', profileResult.error || '創建用戶資料失敗');
        return;
      }

      setUser({
        uid: authResult.user.uid,
        email: authResult.user.email,
        ...userData,
      });
      router.dismissTo('/');
    } catch (_error) {
      Alert.alert(
        '錯誤',
        mode === 'login' ? '登入時發生錯誤，請重試' : '註冊時發生錯誤，請重試'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
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
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AuthModeTabs mode={mode} onChangeMode={setMode} />

        <View className="bg-white rounded-xl p-6 mb-6">
          {mode === 'signup' && (
            <DisplayNameField
              value={userName}
              onChangeText={setUserName}
              editable={!isLoading}
            />
          )}

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

        <Text className="text-sm text-gray-500 text-center">
          {mode === 'login'
            ? '還沒有帳號？點擊上方「註冊」按鈕'
            : '已有帳號？點擊上方「登入」按鈕'}
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
}
