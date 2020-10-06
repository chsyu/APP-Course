import React from "react";
import { ScrollView, Linking } from "react-native";
import { Button, Card, PricingCard, Tile } from "react-native-elements";
import Text from "../components/vinchandText";

const DetailScreen = ({ route }) => {
  const { title, artist, price, url, image, description } = route.params;

  return (
    <ScrollView>
      <Tile
        imageSrc={{ uri: image }}
        featured
        title={title.toUpperCase()}
        caption={artist.toUpperCase()}
      />

      <PricingCard
        color="#4f9deb"
        title="Discount Now!"
        price={`Price: $${price}`}
        info={["1 User", "Basic Support", "All Core Features"]}
        button={{ title: "BUY NOW!", icon: "add-shopping-cart" }}
        onButtonPress={() => Linking.openURL(url)}
      />

      <Card>
        <Text>Artist: {artist}</Text>
        <Text style={{ marginBottom: 10 }}>Title: {title}</Text>
        <Text style={{ fontWeight: "bold" }}>Descriptions:</Text>
        <Text style={{ marginBottom: 10 }}>{description}</Text>
        <Button
          raised
          icon={{ name: "add-shopping-cart" }}
          backgroundColor="#03A9F4"
          title="BUY NOW!"
          onPress={() => Linking.openURL(url)}
        />
      </Card>
    </ScrollView>
  );
};

export default DetailScreen;
