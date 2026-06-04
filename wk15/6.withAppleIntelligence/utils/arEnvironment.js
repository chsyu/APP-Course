import { Platform } from 'react-native';
import * as Device from 'expo-device';

/**
 * AR (ARKit / ARCore) requires a physical device with camera support.
 * Simulators and emulators are not supported by ViroReact.
 */
export function isArSupported() {
  if (Platform.OS === 'web') {
    return false;
  }
  return Device.isDevice;
}
