import { View } from 'react-native';
import { ViroARScene } from '@reactvision/react-viro/dist/components/AR/ViroARScene';
import { ViroARSceneNavigator } from '@reactvision/react-viro/dist/components/AR/ViroARSceneNavigator';
import { ViroImage } from '@reactvision/react-viro/dist/components/ViroImage';

function ARStickerScene() {
  return (
    <ViroARScene>
      <ViroImage
        source={require('../assets/images/partial-react-logo.png')}
        position={[0, 0, -1]}
        scale={[0.35, 0.35, 0.35]}
      />
    </ViroARScene>
  );
}

const INITIAL_SCENE = { scene: ARStickerScene };

export default function DiaryARViroView() {
  return (
    <View className="absolute inset-0 flex-1">
      <View className="flex-1">
        <ViroARSceneNavigator
          autofocus
          initialScene={INITIAL_SCENE}
          provider="none"
        />
      </View>
    </View>
  );
}
