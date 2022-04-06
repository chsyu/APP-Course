import { Center, Text } from 'native-base'

const AdvancedAccountScreen = () => {
   return (
      <Center flex={1}
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "blueGray.50" }}>
         <Text>This is an Advanced Account Setting Page</Text>
      </Center>
   );
}

export default AdvancedAccountScreen;