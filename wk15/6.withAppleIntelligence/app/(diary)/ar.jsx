import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isArSupported } from '../../utils/arEnvironment';
import ThemedText from '../../components/ThemedText';

function ARUnavailableFallback() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Ionicons name="camera-outline" size={48} color="#9CA3AF" />
      <ThemedText className="text-lg font-semibold mt-4 text-center">
        AR 僅支援實機
      </ThemedText>
      <ThemedText colorKey="textSecondary" className="text-sm mt-2 text-center leading-5">
        模擬器與模擬環境無法使用相機與 ARKit，請改用實體 iPhone 或 Android 手機測試此功能。
      </ThemedText>
    </View>
  );
}

export default function DiaryARScreen() {
  if (!isArSupported()) {
    return <ARUnavailableFallback />;
  }

  const DiaryARViroView = require('../../components/DiaryARViroView').default;
  return <DiaryARViroView />;
}
