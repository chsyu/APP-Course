import React from "react";
import {
  VStack,
  Text,
  Pressable,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetContent,
} from "@gluestack-ui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PieChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";

const ActionScreen = ({ handleClose, site }) => {
  const { sna, sbi, sarea, mday, lat, lng, ar, bemp } = site;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };
  const screenWidth = Dimensions.get("window").width;
  const data = [
    {
      name: "可還",
      population: bemp,
      color: "#ff6c00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },    
    {
      name: "可借",
      population: sbi,
      color: "#fbd203",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },

  ];
  const getTime = (m) => {
    const mday = String(m);
    const year = mday.slice(0, 4);
    const month = Number(mday.slice(4, 6));
    const date = Number(mday.slice(6, 8));
    const hour = Number(mday.slice(8, 10));
    const min = Number(mday.slice(10, 12));
    const sec = Number(mday.slice(12));
    const time = `${year}/${month}/${date} ${hour}:${min}:${sec}`;
    return time;
  };

  return (
    <>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack h="50%" w="100%" bg="$blueGray50" borderRadius={20}>
          <Pressable
            onPress={handleClose}
            position="absolute"
            top={2}
            right={3}
          >
            <MaterialCommunityIcons name="close" color="gray" size={30} />
          </Pressable>

          <Text size="3xl" mt="$5" textAlign="center">
            {sna} 站
          </Text>
          <VStack mt={40} px={6} w={"100%"}>
            <VStack ml={40}>
            <Text>
              <Text fontWeight={"bold"}>地址：</Text>
              {sarea} {ar}
            </Text>
            <Text mt={2}>
              <Text fontWeight={"bold"}>經度/緯度：</Text>
              {Number(lng).toFixed(2)}/{Number(lat).toFixed(2)}
            </Text>
            <Text mt={2}>
              <Text fontWeight={"bold"}>更新時間：</Text>
              {getTime(mday)}
            </Text>
            <Text mt={2}>
              <Text fontWeight={"bold"}>可借/可還：</Text>
              {sbi}/{bemp}
            </Text>
          </VStack>
            <PieChart
              data={data}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={0}
              center={[10, 0]}
              absolute
            />
          </VStack>
        </VStack>
      </ActionsheetContent>
    </>
  );
};

export default ActionScreen;
