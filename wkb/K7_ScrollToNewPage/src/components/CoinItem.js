import React from "react";
import { HStack, Text, Box, Image, Pressable, useColorMode } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ marketCoin }) => {
   const {
      id,
      name,
      current_price,
      market_cap_rank,
      price_change_percentage_24h,
      symbol,
      market_cap,
      image,
   } = marketCoin;
   const { colorMode } = useColorMode();
   const navigation = useNavigation();
   const percentageColor =
      price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || 'white';

   const normalizeMarketCap = (marketCap) => {
      if (marketCap > 1e12) {
         return `${(marketCap / 1e12).toFixed(3)} T`;
      }
      if (marketCap > 1e9) {
         return `${(marketCap / 1e9).toFixed(3)} B`;
      }
      if (marketCap > 1e6) {
         return `${(marketCap / 1e6).toFixed(3)} M`;
      }
      if (marketCap > 1e3) {
         return `${(marketCap / 1e3).toFixed(3)} K`;
      }
      return marketCap;
   };

   return (
      <Pressable
         onPress={() => navigation.navigate('Detailed', {coinId: id})}
      >
         <HStack borderBottomWidth={2} borderBottomColor={colorMode === "dark" ? "#282828" : "gray.300"} p={15}>
            <Image
               source={{ uri: image }}
               h={30} w={30} marginRight={3} alignSelf="center"
               alt={name}
            />
            <Box>
               <Text fontSize={16} fontWeight="bold" marginBottom={1}>{name}</Text>
               <HStack>
                  <Box bg='#585858' px={2} borderRadius={5} marginRight={1}>
                     <Text color="white" fontWeight={'bold'}>{market_cap_rank}</Text>
                  </Box>
                  <Text marginRight={1}>{symbol.toUpperCase()}</Text>
                  <AntDesign
                     name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
                     size={12}
                     color={percentageColor}
                     style={{ alignSelf: "center", marginRight: 5 }}
                  />
                  <Text color={percentageColor}>
                     {price_change_percentage_24h?.toFixed(2)}%
                  </Text>
               </HStack>
            </Box>
            <Box marginLeft="auto" alignItems="flex-end">
               <Text fontSize={16} fontWeight="bold" marginBottom={1}>{current_price}</Text>
               <Text>
                  MCap {normalizeMarketCap(market_cap)}
               </Text>
            </Box>
         </HStack>

      </Pressable>
   );
};

export default CoinItem;
