import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function isViroNativeLinked() {
  return Boolean(
    NativeModules.VRTMaterialManager ||
      NativeModules.VRTAnimationManager ||
      NativeModules.VRTARSceneNavigatorModule ||
      NativeModules.VRTARUtils
  );
}

function parseARSupport(support) {
  if (support == null) return false;
  if (typeof support === 'boolean') return support;
  if (typeof support.isARSupported === 'boolean') return support.isARSupported;
  if (typeof support.isARSupported === 'number') return support.isARSupported !== 0;
  return false;
}

async function ensureCameraPermission() {
  const current = await ImagePicker.getCameraPermissionsAsync();
  if (current.granted) return 'granted';

  if (!current.canAskAgain) return 'blocked';

  const requested = await ImagePicker.requestCameraPermissionsAsync();
  if (requested.granted) return 'granted';
  return requested.canAskAgain ? 'denied' : 'blocked';
}

const STATUS = {
  LOADING: 'loading',
  NO_NATIVE: 'no-native',
  UNSUPPORTED: 'unsupported',
  NEED_CAMERA: 'need-camera',
  CAMERA_DENIED: 'camera-denied',
  READY: 'ready',
  ERROR: 'error',
};

export default function DiaryARScreen() {
  const [status, setStatus] = useState(STATUS.LOADING);
  const [ARSceneView, setARSceneView] = useState(null);

  const prepareAR = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setARSceneView(null);

    if (!isViroNativeLinked()) {
      setStatus(STATUS.NO_NATIVE);
      return;
    }

    try {
      const [{ isARSupportedOnDevice }, sceneModule] = await Promise.all([
        import('@reactvision/react-viro/dist/components/Utilities/ViroUtils'),
        import('../../components/ar/DiaryARSceneView'),
      ]);

      const support = await isARSupportedOnDevice();
      if (!parseARSupport(support)) {
        setStatus(STATUS.UNSUPPORTED);
        return;
      }

      const cameraStatus = await ensureCameraPermission();
      if (cameraStatus === 'granted') {
        setARSceneView(() => sceneModule.default);
        setStatus(STATUS.READY);
        return;
      }

      setStatus(cameraStatus === 'blocked' ? STATUS.CAMERA_DENIED : STATUS.NEED_CAMERA);
    } catch {
      setStatus(STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    prepareAR();
  }, [prepareAR]);

  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.screen}>
      {status === STATUS.LOADING ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.message}>正在啟動 AR...</Text>
        </View>
      ) : null}

      {status === STATUS.NO_NATIVE ? (
        <View style={styles.centered}>
          <Text style={styles.message}>
            AR 原生模組尚未載入。請先執行 prebuild，再重新編譯安裝到實機（不可使用 Expo Go）。
          </Text>
          <Text style={styles.hint}>npm run prebuild{'\n'}npm run device</Text>
          <ActionButton label="重新檢查" onPress={prepareAR} />
        </View>
      ) : null}

      {status === STATUS.UNSUPPORTED ? (
        <View style={styles.centered}>
          <Text style={styles.message}>這台裝置目前不支援 ARKit。</Text>
          <ActionButton label="重新檢查" onPress={prepareAR} />
        </View>
      ) : null}

      {status === STATUS.NEED_CAMERA ? (
        <View style={styles.centered}>
          <Text style={styles.message}>
            需要相機權限才能顯示 AR。請允許相機存取，若未出現提示請點下方按鈕。
          </Text>
          <ActionButton label="允許相機" onPress={prepareAR} />
        </View>
      ) : null}

      {status === STATUS.CAMERA_DENIED ? (
        <View style={styles.centered}>
          <Text style={styles.message}>
            相機權限已關閉。請到「設定 → 日記 → 相機」開啟後再回來。
          </Text>
          <ActionButton label="開啟設定" onPress={openSettings} />
          <ActionButton label="重新檢查" onPress={prepareAR} />
        </View>
      ) : null}

      {status === STATUS.ERROR ? (
        <View style={styles.centered}>
          <Text style={styles.message}>AR 初始化失敗，請重新檢查或重新編譯 App。</Text>
          <ActionButton label="重新檢查" onPress={prepareAR} />
        </View>
      ) : null}

      {status === STATUS.READY && ARSceneView ? <ARSceneView /> : null}
    </View>
  );
}

function ActionButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  message: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  hint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
