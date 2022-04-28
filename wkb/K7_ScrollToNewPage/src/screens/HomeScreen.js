import React, { useEffect, useState } from "react";
import { FlatList, HStack, VStack, Text, useColorMode } from "native-base";
import { RefreshControl, ActivityIndicator } from "react-native"
import CoinItem from "../components/CoinItem";
import { getMarketData } from "../api";

const HomeScreen = () => {
  const { colorMode } = useColorMode();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCoins = async (pageNumber = 1) => {
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

  const renderFooter = () => {
    return loading && <ActivityIndicator />
  }

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

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
        ListFooterComponent={renderFooter}
        onEndReached={() => !loading && setPage(page + 1)}
        onEndReachedThreshold={0.5}
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
