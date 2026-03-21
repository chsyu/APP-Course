import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { LocationDiarySheet } from '../../components/LocationDiarySheet';
import useDiaryStore from '../../store/useDiaryStore';
import { colors } from '../../utils/color';
import { roundCoordinates } from '../../utils/locationHelper';

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

  // 計算地圖初始區域（基於所有日記的位置）
  const initialRegion = useMemo(() => {
    const diariesWithLocation = diaries.filter(
      (diary) => diary.latitude != null && diary.longitude != null
    );

    if (diariesWithLocation.length === 0) {
      return {
        latitude: 25.033,
        longitude: 121.5654,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    }

    const latitudes = diariesWithLocation.map((d) => d.latitude);
    const longitudes = diariesWithLocation.map((d) => d.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latDelta = (maxLat - minLat) * 1.5 || 0.1;
    const lngDelta = (maxLng - minLng) * 1.5 || 0.1;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(latDelta, 0.05),
      longitudeDelta: Math.max(lngDelta, 0.05),
    };
  }, [diaries]);

  const handleMarkerPress = (marker) => {
    setSelectedLocation(marker);
    setSheetVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
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
            onPress={() => handleMarkerPress(marker)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerBubble}>
                <Text style={styles.markerText}>{marker.count}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {locationMarkers.length === 0 && (
        <View style={styles.emptyMapOverlay} pointerEvents="box-none">
          <View style={styles.emptyMapCard}>
            <Text style={styles.emptyMapTitle}>沒有位置資料</Text>
            <Text style={styles.emptyMapSubtitle}>
              {diaries.length === 0
                ? '還沒有任何日記'
                : '現有的日記沒有位置資訊，創建新日記時會自動記錄位置'}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        className="absolute right-10 bottom-20 w-16 h-16 rounded-full items-center justify-center"
        style={{
          backgroundColor: colors.fab,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        }}
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

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerBubble: {
    backgroundColor: colors.fab,
    borderRadius: 20,
    minWidth: 40,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMapCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyMapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyMapSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
