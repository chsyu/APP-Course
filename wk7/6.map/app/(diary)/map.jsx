import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import FabButton from '../../components/FabButton';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import useDiaryStore from '../../store/useDiaryStore';
import { roundCoordinates } from '../../utils/locationHelper';

export default function MapScreen() {

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

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {locationMarkers.map((marker, index) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}-${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <View className="items-center justify-center">
              <View className="bg-fab rounded-[20px] min-w-[30px] h-10 px-3 justify-center items-center border-[3px] border-white shadow-lg">
                <Text className="text-white text-base font-bold">{marker.count}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
      <FabButton onPress={handleCreateDiary} />
    </View>
  );
}
