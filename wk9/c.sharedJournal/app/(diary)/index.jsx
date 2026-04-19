import React, { useMemo, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import DiaryItem from '../../components/DiaryItem';
import FabButton from '../../components/FabButton';
import { LocationDiarySheet } from '../../components/LocationDiarySheet';
import { useShallow } from 'zustand/react/shallow';
import useDiaryStore, { selectActiveDiaries } from '../../store/useDiaryStore';
import SharedJournalStackHeaderTitle from '../../components/SharedJournalStackHeaderTitle';
import { normalizeAuthEmail } from '../../services/userService';
import { colors } from '../../utils/color';
import { getPlainTextLength } from '../../utils/htmlUtils';
import { roundCoordinates } from '../../utils/locationHelper';

const TABS = [
  { id: 'list', label: '列表' },
  { id: 'stats', label: '統計' },
  { id: 'map', label: '地圖' },
];

const ANDROID_TILE_URL =
  'https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png';

function getAuthorDisplayLine(diary, journal) {
  if (journal?.kind !== 'shared') return '';
  const em = normalizeAuthEmail(diary.createdByEmail);
  if (!em) return '—';
  const m = journal.memberSummaries?.find((x) => normalizeAuthEmail(x.email) === em);
  const name = (m?.userName || '').trim();
  return name || em;
}

function DiaryListPanel() {
  const diaries = useDiaryStore(useShallow(selectActiveDiaries));
  const createDiary = useDiaryStore((s) => s.createDiary);
  const activeJournal = useDiaryStore((s) => {
    const j = s.journals.find((x) => x.id === s.activeJournalId);
    return j ?? null;
  });
  const router = useRouter();

  const handleCreateDiary = async () => {
    const newDiary = await createDiary();
    router.push(`/diary/${newDiary.id}`);
  };

  return (
    <View className="flex-1">
      <FlatList
        data={diaries}
        renderItem={({ item }) => (
          <DiaryItem
            diary={item}
            authorDisplayLine={
              activeJournal?.kind === 'shared'
                ? getAuthorDisplayLine(item, activeJournal)
                : undefined
            }
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={diaries}
        contentContainerClassName="p-4 pb-[100px]"
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white"
      />
      <FabButton onPress={handleCreateDiary} />
    </View>
  );
}

function DiaryStatsPanel() {
  const diaries = useDiaryStore(useShallow(selectActiveDiaries));
  const stats = useMemo(() => {
    const diaryCount = diaries.length;
    const uniqueDates = new Set(diaries.map((diary) => diary.date.split(' ')[0]));
    const dayCount = uniqueDates.size;
    const totalWords = diaries.reduce(
      (sum, diary) => sum + getPlainTextLength(diary.content),
      0
    );
    const avgWords = diaryCount > 0 ? Math.round(totalWords / diaryCount) : 0;
    return { diaryCount, dayCount, avgWords };
  }, [diaries]);

  return (
    <ScrollView
      className="px-4 pt-4 flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-xl p-6 mb-3 shadow-sm">
        <Text className="text-xl font-bold text-gray-800 mb-6">統計資料</Text>
        <View>
          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}
          >
            <Text className="text-base text-gray-600">日記篇數</Text>
            <Text className="text-3xl font-bold text-gray-800">{stats.diaryCount}</Text>
          </View>
          <View
            className="flex-row justify-between items-center pb-4 mb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}
          >
            <Text className="text-base text-gray-600">日記天數</Text>
            <Text className="text-3xl font-bold text-gray-800">{stats.dayCount}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-base text-gray-600">平均字數</Text>
            <Text className="text-3xl font-bold text-gray-800">{stats.avgWords}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DiaryMapPanel() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const diaries = useDiaryStore(useShallow(selectActiveDiaries));
  const createDiary = useDiaryStore((s) => s.createDiary);
  const router = useRouter();

  const handleCreateDiary = async () => {
    const newDiary = await createDiary();
    router.push(`/diary/${newDiary.id}`);
  };

  const locationMarkers = useMemo(() => {
    const diariesWithLocation = diaries.filter(
      (diary) => diary.latitude != null && diary.longitude != null
    );
    if (diariesWithLocation.length === 0) return [];
    const locationMap = new Map();
    diariesWithLocation.forEach((diary) => {
      const rounded = roundCoordinates(diary.latitude, diary.longitude, 4);
      const key = `${rounded.latitude},${rounded.longitude}`;
      if (locationMap.has(key)) {
        const existing = locationMap.get(key);
        existing.count += 1;
        existing.diaries.push(diary);
      } else {
        locationMap.set(key, {
          latitude: rounded.latitude,
          longitude: rounded.longitude,
          count: 1,
          diaries: [diary],
        });
      }
    });
    return Array.from(locationMap.values());
  }, [diaries]);

  const initialRegion = {
    latitude: 25.033,
    longitude: 121.5654,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {Platform.OS === 'android' && (
          <UrlTile urlTemplate={ANDROID_TILE_URL} maximumZ={19} />
        )}
        {locationMarkers.map((marker, index) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}-${index}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => {
              setSelectedLocation(marker);
              setSheetVisible(true);
            }}
          >
            <View className="items-center justify-center">
              <View className="bg-fab rounded-[20px] min-w-[32px] h-10 px-3 justify-center items-center border-[3px] border-white shadow-lg">
                <Text className="text-white text-base font-bold">{marker.count}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
      {locationMarkers.length === 0 && (
        <View className="absolute inset-0 justify-center items-center" pointerEvents="box-none">
          <View className="bg-white/95 rounded-2xl p-6 m-5 items-center shadow-lg">
            <Text className="text-lg font-bold text-gray-800 mb-2">沒有位置資料</Text>
            <Text className="text-sm text-gray-500 text-center leading-5">
              {diaries.length === 0
                ? '還沒有任何日記'
                : '現有的日記沒有位置資訊，創建新日記時會自動記錄位置'}
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        className="absolute right-10 bottom-20 w-16 h-16 rounded-full items-center justify-center bg-fab shadow-xl"
        onPress={handleCreateDiary}
        activeOpacity={0.8}
      >
        <Text className="text-white text-[40px] font-light leading-[40px]">+</Text>
      </TouchableOpacity>
      <LocationDiarySheet
        visible={sheetVisible}
        diaries={selectedLocation?.diaries || []}
        onClose={() => {
          setSheetVisible(false);
          setSelectedLocation(null);
        }}
      />
    </View>
  );
}

export default function DiaryHomeScreen() {
  const [tab, setTab] = useState('list');
  const rootNavigation = useNavigation('/');

  /** 根 Stack (diary) 標題區：必須回傳 JSX，不可傳元件參考，否則 React Navigation 會當 render prop 直接呼叫，導致 Rules of Hooks 錯誤 */
  useLayoutEffect(() => {
    rootNavigation.setOptions({
      headerTitle: () => <SharedJournalStackHeaderTitle />,
      headerTitleAlign: 'center',
    });
  }, [rootNavigation]);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        <View className="px-4 pt-4 pb-3">
          <View className="flex-row items-center justify-center gap-16">
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <Pressable key={t.id} onPress={() => setTab(t.id)} className="pb-2">
                  <Text
                    className={`text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}
                    style={isActive ? { borderBottomWidth: 2, borderBottomColor: '#000' } : {}}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View
            className="border-b border-gray-200 mt-2"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}
          />
        </View>
        <View className="flex-1 min-h-0">
          {tab === 'list' ? <DiaryListPanel /> : null}
          {tab === 'stats' ? <DiaryStatsPanel /> : null}
          {tab === 'map' ? <DiaryMapPanel /> : null}
        </View>
      </View>
    </View>
  );
}
