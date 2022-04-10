import React, { useEffect, useState } from "react";
import { FlatList,  HStack, VStack, Text, useColorMode } from "native-base";
import { RefreshControl } from "react-native"
import CoinItem from "../components/CoinItem";
import { getMarketData } from "../services/requests";

const HomeScreen = () => {
  const { colorMode } = useColorMode();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
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
    fetchCoins(page);
  }, [page]);

  return (
    <VStack flex={1}>
      <HStack justifyContent="space-between" >
        <Text fontSize={25} alignSelf="center">Cryptoassets</Text>
        <Text fontSize={12} alignSelf="center">Powered by CoinGecko</Text>
      </HStack>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.market_cap_rank}
        onEndReached={() => setPage(page + 1)}
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
