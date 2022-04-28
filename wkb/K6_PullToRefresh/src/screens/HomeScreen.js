import React, { useEffect, useState } from "react";
import { FlatList, HStack, VStack, Text, useColorMode } from "native-base";
import { RefreshControl } from "react-native"
import CoinItem from "../components/CoinItem";
import { getMarketData } from "../api";

const HomeScreen = () => {
  const { colorMode } = useColorMode();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    const coinsData = await getMarketData(pageNumber);
    setCoins(coinsData);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins(1);
  }, []);

  return (
    <VStack flex={1} mx={2}>
      <HStack justifyContent="space-between" >
        <Text fontSize={25} alignSelf="center">Cryptoassets</Text>
        <Text fontSize={12} alignSelf="center">Powered by CoinGecko</Text>
      </HStack>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.market_cap_rank}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={ colorMode == "dark" ? "white" : "black"}
            onRefresh={refetchCoins}
          />}   
      />
    </VStack>
  );
};

export default HomeScreen;
