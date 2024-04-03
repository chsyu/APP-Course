import React from "react";
import {
  VStack,
  Text,
  Center,
  Pressable,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetContent,
} from "@gluestack-ui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PieChart from "react-native-pie-chart";
const widthAndHeight = 250;

const ActionScreen = ({ handleClose, site }) => {
  const { sna, sbi, sarea, mday, lat, lng, ar, bemp } = site;

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
  console.log({sbi, bemp})
  const series = [sbi, bemp];
  const sliceColor = ["#fbd203", "#ff6c00"];

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

          <Text size="lg" my={6} textAlign="center">
            {sna} 站
          </Text>
          <VStack px={6} w={"80%"}>
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
          </VStack>
        </VStack>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
          coverFill={"#FFF"}
        />
      </ActionsheetContent>
    </>
  );
};

export default ActionScreen;
