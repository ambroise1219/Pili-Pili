import { View, Text, Image } from 'react-native'
import React from 'react'
import {colors} from '../constant/theme'
import { useFonts } from 'expo-font';

const Caroussel = () => {

  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require('./../assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-Medium": require('./../assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('./../assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-SemiBold": require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    "MadimiOne": require('./../assets/fonts/MadimiOne.ttf'),
    "Pacifico": require('./../assets/fonts/Pacifico.ttf'),
  });
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View className='flex flex-row  px-3 py-6 mt-5 ' style={{borderRadius: 20, backgroundColor: colors.primary}}>
        <View className='flex-1 items-start justify-center ml-3'>
          <Text className='text-3xl  -mt-8 text-white' style={{fontFamily: 'MadimiOne'}}>
            Le menu Grouilleur  <Text className='text-3xl font-bold text-yellow-400'>
          
          </Text>
          </Text> 
          <Text className='text-xl font-bold text-white'>
            Un acheter, <Text className='text-xl font-bold text-yellow-400'>
           un offert ! 
          </Text>
          </Text>
        </View>
        <View className='flex'>
          <Image source={require('../assets/images/hamburger.png')} style={{width: 150, height: 140,marginTop:-25, resizeMode: 'cover',}} />
        </View>
       </View>
  )
}

export default Caroussel