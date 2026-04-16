import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EmailField({ value, onChangeText, editable }) {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 mb-2">郵箱</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 text-base"
        placeholder="請輸入郵箱"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        style={{
          paddingTop: 8,
          paddingBottom: 12,
          minHeight: 48,
        }}
      />
    </View>
  );
}

export function PasswordField({
  label,
  placeholder,
  value,
  onChangeText,
  showPassword,
  onToggleShow,
  editable,
}) {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 mb-2">{label}</Text>
      <View className="relative">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 pr-12 text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          editable={editable}
          style={{
            paddingTop: 8,
            paddingBottom: 12,
            minHeight: 48,
          }}
        />
        <Pressable
          onPress={onToggleShow}
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
  );
}
