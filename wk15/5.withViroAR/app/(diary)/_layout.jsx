import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import Animated, { Easing, Layout } from 'react-native-reanimated';
import { useAnimatedThemeBackground, useThemeColor } from '../../hooks/useTheme';
import ThemedText from '../../components/ThemedText';

const TABS = [
  { id: 'list', path: '/', label: '列表' },
  { id: 'stats', path: '/stats', label: '統計' },
  { id: 'map', path: '/map', label: '地圖' },
  { id: 'chat', path: '/chat', label: '聊天' },
  { id: 'ar', path: '/ar', label: 'AR' },
];

export default function DiaryLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = TABS.find((tab) => pathname === tab.path)?.id ?? 'list';

  const primaryStyle = useAnimatedThemeBackground('primary');
  const contentStyle = useAnimatedThemeBackground('content');
  const tabUnderlineColor = useThemeColor('tabUnderline');
  const borderColor = useThemeColor('border');

  const tabLayouts = useRef(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const updateUnderline = (tabId) => {
    const layout = tabLayouts.current.get(tabId);
    if (layout) {
      setUnderline({ left: layout.x, width: layout.width });
    }
  };

  const handleTabLayout = (tabId, event) => {
    const { x, width } = event.nativeEvent.layout;
    tabLayouts.current.set(tabId, { x, width });

    if (activeTab === tabId) {
      setUnderline({ left: x, width });
    }
  };

  useEffect(() => {
    updateUnderline(activeTab);
  }, [activeTab]);

  return (
    <Animated.View className="flex-1" style={primaryStyle}>
      <Animated.View className="flex-1 rounded-t-[40px] overflow-hidden" style={contentStyle}>
        <View className="px-4 pt-4 pb-3">
          <View className="flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2 relative">
            {TABS.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => router.replace(tab.path)}
                  className="pb-2"
                  onLayout={(event) => handleTabLayout(tab.id, event)}
                >
                  <ThemedText
                    className="text-base font-medium"
                    colorKey={isActive ? 'text' : 'textSecondary'}
                  >
                    {tab.label}
                  </ThemedText>
                </Pressable>
              );
            })}
            <Animated.View
              layout={Layout.duration(300).easing(Easing.out(Easing.ease))}
              style={{
                position: 'absolute',
                bottom: 8,
                left: underline.left,
                width: underline.width,
                height: 2,
                backgroundColor: tabUnderlineColor,
              }}
            />
          </View>
          <View
            className="mt-2"
            style={{ borderBottomWidth: 1, borderBottomColor: borderColor }}
          />
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
