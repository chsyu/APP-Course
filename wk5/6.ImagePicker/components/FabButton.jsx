import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../utils/color';

export default function FabButton({ onPress }) {
  return (
    <TouchableOpacity
      className="absolute right-10 bottom-20 w-16 h-16 rounded-full items-center justify-center"
      style={{
        backgroundColor: colors.fab,
        elevation: 8, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-white text-[40px] font-light leading-[40px]">+</Text>
    </TouchableOpacity>
  );
}
