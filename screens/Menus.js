import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { boutique } from '../constant';  
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';
import MenuItems from '../components/MenusItems';
import { useFonts } from 'expo-font';
 
const Menus = () => {
 
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require('./../assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-Medium": require('./../assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('./../assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-SemiBold": require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    "Pacifico": require('./../assets/fonts/Pacifico.ttf'),
  });
  if (!fontsLoaded) {
    return undefined;
  }

  const navigation = useNavigation()
  const [selectedBoutique, setSelectedBoutique] = React.useState(boutique[0])  
  return (
    <View className='flex'>
        <ScrollView showsVerticalScrollIndicator={false}>


   <View className='flex flex-row items-center justify-between mb-2 mt-2'>

   <TouchableOpacity onPress={()=> navigation.goBack()} className='p-2 mx-2 ml-4 bg-red-500' style={{backgroundColor: colors.secondary, borderRadius: 30}}>

   <Ionicons name='arrow-back-outline' size={28} color='white'/>

   </TouchableOpacity>

   
   <View className='flex' >
   <Text className='text-3xl mt-2  text-slate-700 ' style={{fontFamily: 'Pacifico'}} >On mange quoi aujourd'hui ?</Text>

   </View>

   <View className='px-4 flex'><Text> </Text></View>

   </View>
   <View className='mb-4'>
   <MenuItems products={selectedBoutique.menus} />  
   </View>
       
      </ScrollView>
    </View>
  );
};

export default Menus;