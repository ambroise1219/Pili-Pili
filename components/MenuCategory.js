import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { boutique } from '../constant'; 
import MenuItems from './MenusItems';
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';
const MenuCategory = () => {

  const navigation = useNavigation()
  const [selectedBoutique, setSelectedBoutique] = React.useState(boutique[0])  
  return (
    <View className='flex'>
      <Text className='text-2xl font-bold text-slate-700 pt-4'>Nos menus</Text>
      <MenuItems products={selectedBoutique.menuPopulaires} />  
      <TouchableOpacity className='flex flex-row items-center justify-center p-4  rounded-xl m-3' onPress={()=> navigation.navigate("Menus")} style={{backgroundColor: colors.secondary}}>
        <Text className='text-lg text-slate-50 mr-2 font-bold'>Voir plus de menus</Text>
        <Ionicons name='arrow-forward-outline' size={26} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default MenuCategory;