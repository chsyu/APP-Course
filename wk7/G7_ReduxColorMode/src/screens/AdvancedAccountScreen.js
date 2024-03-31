import { Center, Text } from '@gluestack-ui/themed'
import { useSelector } from 'react-redux'
import { selectColorMode } from '../redux/settingsSlice'

const AdvancedAccountScreen = () => {
   const colorMode = useSelector(selectColorMode)
   return (
      <Center flex={1}>
         <Text color={
            colorMode == "light" ? "black" : "white"
         }>This is an Advanced Account Setting Page</Text>
      </Center>
   );
}

export default AdvancedAccountScreen;