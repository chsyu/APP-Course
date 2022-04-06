import React from 'react';
import { Center, ScrollView, Box, AspectRatio, Text, Heading, Image, Button } from "native-base";


const DetailScreen = ({ route }) => {
  const { title, 
    authors,
    rating,
    image_url,
    description
  } = route.params;
  return (
    <Center 
      flex={1} _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "white" }}
    >
      <ScrollView >
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{uri: image_url }}
            alt='albumImage'
          />
        </AspectRatio>
        <Box shadow={1} _dark={{ bg: "blueGray.900", borderColor: 'blueGray.500', borderWidth: 0.6 }}
        _light={{ bg: "blueGray.50" }} padding="2" margin="2">
          <Center>
            <Heading pt={1} fontSize="2xl" color='#6099E4'>Rating Now!</Heading>
            <Heading fontSize="4xl">Rating: {rating}</Heading>
          </Center>
        </Box>
        <Box shadow={1} _dark={{ bg: "blueGray.900", borderColor: 'blueGray.500', borderWidth: 0.6 }}
        _light={{ bg: "blueGray.50" }} padding="2" margin="2">
            <Text>
              <Text bold>Authors: </Text>
              {authors}
            </Text>
            <Text>            
              <Text bold>Title: </Text>
              {title}
            </Text>
            <Text mt='15' bold>Descriptions:</Text>
            <Text>{'\t'}{description}</Text>
        </Box>
      </ScrollView>      
    </Center>

  );
}

export default DetailScreen;
