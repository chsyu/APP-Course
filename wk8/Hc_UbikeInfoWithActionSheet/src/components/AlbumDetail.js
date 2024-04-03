import React from "react";
import { Box, HStack, VStack, Text, Image, Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

const AlbumDetail = ({ album }) => {
  const { navigate } = useNavigation();
  return (
    <Box p={10} marginX={1} marginBottom={2} borderRadius={3} shadow={2}>
      <HStack bg='#fff'>
          <Image
            width={50}
            height={50}
            margin="1"
            source={{ uri: album.thumbnail_image }}
            alt="artist"
          />
        <VStack margin={2} paddingLeft={2} justifyContent="space-between">
          <Text bold>{album.title}</Text>
          <Text>{album.artist}</Text>
        </VStack>
      </HStack>
      <Box bg="#fff">
        <Pressable 
          onPress={() => navigate('Detail', album)}
        >
            <Image
              style={{ width: "100%", height: 300 }}
              source={{ uri: album.image }}
              alt="album"
            />            
        </Pressable>
      </Box>   
    </Box>
  )};

export default AlbumDetail;
