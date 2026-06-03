import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ViroARScene } from '@reactvision/react-viro/dist/components/AR/ViroARScene';
import { ViroARSceneNavigator } from '@reactvision/react-viro/dist/components/AR/ViroARSceneNavigator';
import { ViroImage } from '@reactvision/react-viro/dist/components/ViroImage';

function ARStickerScene() {
  return (
    <ViroARScene>
      <ViroImage
        source={require('../../assets/images/partial-react-logo.png')}
        position={[0, 0, -1]}
        scale={[0.35, 0.35, 0.35]}
      />
    </ViroARScene>
  );
}

export default function DiaryARSceneView() {
  const initialScene = useMemo(() => ({ scene: ARStickerScene }), []);

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        initialScene={initialScene}
        provider="none"
        style={styles.arView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  arView: {
    flex: 1,
  },
});
