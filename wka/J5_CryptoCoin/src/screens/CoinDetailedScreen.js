import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Input, Text, HStack, Switch, VStack, ScrollView, useColorMode } from "native-base"
import { ActivityIndicator, Dimensions } from "react-native"
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";

import CoinDetailedHeader from "../components/CoinDetailedHeader";
import FilterComponent from "../components/FilterComponent"
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
} from "../services/requests";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailedScreen = ({ route, navigation }) => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);
  const [lineMode, setLineMode] = useState(0);
  const { coinId } = route.params;
  const { colorMode } = useColorMode();

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    // console.log(selectedRangeValue)
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    // console.log(selectedRangeValue)
    const fetchedSelectedCandleChartData = await getCandleChartData(
      coinId,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData(1);
  }, []);

  useEffect(() => {
    if (coin != null) {
      navigation.setOptions({
        headerTitle: () => {
          return (
            <CoinDetailedHeader
              coinId={coin.id}
              image={coin.image.small}
              symbol={coin.symbol}
              marketCapRank={coin.market_data.market_cap_rank}
            />
          )
        },
      });
    }
  }, [coin])

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width * 0.8;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  let line_data = [];
  prices.map(([timestamp, value]) => line_data.push({ timestamp, value }))
  let candle_data = [];
  coinCandleChartData.map(([timestamp, open, high, low, close]) => candle_data.push({ timestamp, open, high, low, close }))

  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" mt={20}>
        <LineChart.Provider data={line_data} >
          <HStack
            justifyContent={"space-around"}
            bg={colorMode === "dark" ? "#2B2B2B" : "lightgray"}
            py="1"
            borderRadius="md"
            my="2"
            mb="3"
            w="80%"
          >
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
                key={day.filterText}
              />
            ))}
          </HStack>
          <HStack space={8} alignItems="center" mb={3} >
            <Text fontSize="lg">{lineMode == 0 ? "Normal Line" : "Candle Line"}</Text>
            <Switch
              size="sm"
              colorScheme="emerald"
              name="line Mode"
              isChecked={lineMode === 1}
              onToggle={() => setLineMode(1 - lineMode)}
              accessibilityLabel="line-mode"
              accessibilityHint="line or candle"
            />
          </HStack>
          <HStack mb={10}>
            <Text color={chartColor} fontSize={20}>Current price = </Text>
            <LineChart.PriceText
              format={formatCurrency}
              style={{
                color: chartColor,
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            />
          </HStack>

          {
            lineMode == 0
              ? (
                <LineChart height={screenWidth / 2} width={screenWidth}>
                  <LineChart.Path color={chartColor}>
                    <LineChart.Gradient color={ colorMode==="dark" ? "white" : "black"} />
                  </LineChart.Path>
                  <LineChart.CursorCrosshair color={chartColor} />
                </LineChart>
              )
              : (
                <CandlestickChart.Provider data={candle_data} >
                  <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                    <CandlestickChart.Candles />
                    <CandlestickChart.Crosshair>
                      <CandlestickChart.Tooltip />
                    </CandlestickChart.Crosshair>
                  </CandlestickChart>
                  <CandlestickChart.DatetimeText
                    style={{ color: "white", fontWeight: "600", margin: 10 }}
                  />
                </CandlestickChart.Provider>
              )
          }



          <HStack space="10" mt={20}>
            <HStack space="2">
              <Text alignSelf="center">
                {symbol.toUpperCase()}:
              </Text>
              <Input
                variant="underlined"
                textAlign="center"
                w="32"
                value={coinValue}
                keyboardType="numeric"
                onChangeText={changeCoinValue}
              />
            </HStack>

            <HStack space="2">
              <Text alignSelf="center">USD:</Text>
              <Input
                variant="underlined"
                textAlign="center"
                w="32"
                value={usdValue}
                keyboardType="numeric"
                onChangeText={changeUsdValue}
              />
            </HStack>
          </HStack>
        </LineChart.Provider>

      </VStack>
    </ScrollView>

  );
}

export default CoinDetailedScreen;