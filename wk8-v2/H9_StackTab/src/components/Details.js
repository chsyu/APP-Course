import React, { Component } from 'react';
import { ScrollView, Linking } from 'react-native';
import { Button, Card, Text, PricingCard, Tile, Icon } from 'react-native-elements';

// Make a component
class Details extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      // title: params.title.toUpperCase(),
      headerRight: (
        <Icon
            name='add-shopping-cart'
            iconStyle={{ marginRight: 10 }}
            onPress={() => Linking.openURL(params.url)}
        />
      )
    }
  };  

  render() {
  const { title, 
          artist,
          price,
          url,
          image,
          descriptions
  } = this.props.navigation.state.params;

  const { boldFont } = styles;

  return (
    <ScrollView>

      <Tile
        imageSrc={{ uri: image }}
        featured
        title={title.toUpperCase()}
        caption={artist.toUpperCase()}
      />

      <PricingCard
          color='#4f9deb'
          title='Discount Now!'
          price={`Price: $${price}`}
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: 'BUY NOW!', icon: 'add-shopping-cart' }}
          onButtonPress={() => Linking.openURL(url)}
      />

      <Card>
        <Text>Artist: {artist}</Text>
        <Text style={{ marginBottom: 10 }}>Title: {title}</Text>
        <Text style={boldFont}>Descriptions:</Text>
        <Text style={{ marginBottom: 10 }}>
          {descriptions}          
        </Text>
        <Button
          raised
          icon={{ name: 'add-shopping-cart' }}
          backgroundColor='#03A9F4'
          title='BUY NOW!'
          onPress={() => Linking.openURL(url)}
        />
      </Card>

    </ScrollView>
  );
};

}

const styles = {
  boldFont: {
    fontWeight: 'bold'
  }
};


export default Details;
