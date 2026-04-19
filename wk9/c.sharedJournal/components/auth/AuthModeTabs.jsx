import { View, Text, Pressable } from 'react-native';

export default function AuthModeTabs({ mode, onChangeMode }) {
  return (
    <View className="flex-row mb-8 justify-center">
      <Pressable
        onPress={() => onChangeMode('login')}
        className={`px-6 py-2 rounded-full ${mode === 'login' ? 'bg-gray-600' : 'bg-gray-200'}`}
      >
        <Text
          className={`text-base font-medium ${mode === 'login' ? 'text-white' : 'text-gray-700'}`}
        >
          登入
        </Text>
      </Pressable>
      <View className="w-4" />
      <Pressable
        onPress={() => onChangeMode('signup')}
        className={`px-6 py-2 rounded-full ${mode === 'signup' ? 'bg-gray-600' : 'bg-gray-200'}`}
      >
        <Text
          className={`text-base font-medium ${mode === 'signup' ? 'text-white' : 'text-gray-700'}`}
        >
          註冊
        </Text>
      </Pressable>
    </View>
  );
}
