import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { LocationDiarySheet } from '../../components/LocationDiarySheet';
import useDiaryStore from '../../store/useDiaryStore';
import { roundCoordinates } from '../../utils/locationHelper';

// Android 地圖圖磚選項（修改下面網址即可切換）：
// --- Carto ---
//   voyager (彩色): https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png
//   light_all (極淺灰): https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
//   dark_all (全黑): https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png
// --- 其他（基於 OSM）---
//   opentopomap (地形圖，暖色調): https://a.tile.opentopomap.org/{z}/{x}/{y}.png
//   humanitarian (人道風格，對比較高): https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
//   cyclosm (單車風格): https://a.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png
//   memomaps (交通圖): https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png
//   stamen_watercolor (水彩藝術風): https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg
const ANDROID_TILE_URL =
  'https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.pngs';

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const diaries = useDiaryStore((state) => state.diaries);
  const createDiary = useDiaryStore((state) => state.createDiary);
  const router = useRouter();

  const handleCreateDiary = async () => {
    const newDiary = await createDiary();
    router.push(`/diary/${newDiary.id}`);
  };

  // 計算位置聚合（將接近的經緯度合併）
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

  const handleMarkerPress = (marker) => {
    setSelectedLocation(marker);
    setSheetVisible(true);
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
          <UrlTile
            urlTemplate={ANDROID_TILE_URL}
            maximumZ={19}
          />
        )}
        {locationMarkers.map((marker, index) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}-${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker)}
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
        <View
          className="absolute inset-0 justify-center items-center"
          pointerEvents="box-none"
        >
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
        <Text className="text-white text-[40px] font-light leading-[40px]">
          +
        </Text>
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
