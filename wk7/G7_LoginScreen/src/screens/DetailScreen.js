import React from "react";
import { Linking } from "react-native";
import {
  Center,
  ScrollView,
  Box,
  Text,
  Heading,
  Image,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

const DetailScreen = ({ route }) => {
  const { title, artist, price, url, image, description } = route.params;
  return (
    <Center>
      <ScrollView>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: image }}
          alt="albumImage"
        />
        <Box bg="#fff" padding="2" margin="2">
          <Center>
            <Heading pt={1} size="2xl" color="#6099E4">
              Discount Now!
            </Heading>
            <Heading size="3xl">Price: ${price}</Heading>
          </Center>
          <Button mt="4" onPress={() => Linking.openURL(url)}>
            <ButtonText>Buy Now !</ButtonText>
          </Button>
        </Box>
        <Box bg="#fff" padding="2" margin="2">
          <Text paddingVertical={3}>
            <Text bold>Artist: </Text>
            {artist}
          </Text>
          <Text paddingVertical={3}>
            <Text bold>Title: </Text>
            {title}
          </Text>
          <Text mt="15" bold>
            Descriptions:
          </Text>
          <Text>
            {"\t"}
            {description}
          </Text>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default DetailScreen;
