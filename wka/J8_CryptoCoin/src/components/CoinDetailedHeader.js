import React from "react";
import { View } from "react-native";
import { HStack, Text, Image } from "native-base";

const CoinDetailedHeader = (props) => {
  const { image, symbol, marketCapRank } = props;

  return (
    <HStack alignItems="center" juatifyContent="space-between">
      <Image source={{ uri: image }} w={25} h={25} alt="marketCapRank" />
      <Text fontWeight="bold" fontSize={17} mx="1" >{symbol.toUpperCase()}</Text>
      <View px="2" py="1" borderRadius="md">
        <Text fontWeight="bold" fontSize={15}>
          #{marketCapRank}
        </Text>
      </View>
    </HStack>
  );
};

export default CoinDetailedHeader;
