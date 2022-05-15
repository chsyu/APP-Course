import React from "react";
import { Box, HStack, VStack, AspectRatio, Text, Image, Pressable } from "native-base"

const Detail = ({ item, navigation }) => {

  const { image_url, title, authors } = item;

  return (
    <Box 
      marginX={1} marginBottom={2} borderRadius={3} shadow={2}
      _dark={{ borderColor: 'blueGray.500', borderWidth: 0.6 }}
    >
      <HStack 
        _dark={{ bg: "blueGray.900"}}
        _light={{ bg: "white" }}>
        <AspectRatio w="50" ratio={1}>
          <Image
            margin="1"
            source={{ uri: image_url }}
            alt="artist"
          />
        </AspectRatio>
        <VStack paddingLeft={2} justifyContent="space-around">
          <Text>{title}</Text>
          <Text>{authors}</Text>
        </VStack>
      </HStack>
      <Box p={1} _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "white" }}>
        <Pressable 
          onPress={() => navigation.navigate('Detail', item)}
        >
          <AspectRatio w="100%" ratio={1}>
            <Image
              source={{ uri: image_url }}
              alt="image"
            />            
          </AspectRatio>
        </Pressable>
      </Box>   
    </Box>
  )};

export default Detail;
