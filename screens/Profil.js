import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';

const Profil = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle='flex-grow   px-5 py-8'style={{backgroundColor: colors.mainColor}} >
      <View className='items-center mb-8'>
        <View className='border-4 mt-5 rounded-full ' style={{borderColor: colors.secondary}}>
          <Image source={require('../assets/images/portrait.png')} className='w-24 h-24 rounded-full' />
        </View>
        <Text className='text-2xl font-bold text-white mt-2'>Nadège Koffi</Text>
      </View>

      <View className=' placeholder:rounded-2xl p-5 mb-8 mx-4'style={{backgroundColor: colors.primary}} >
        <View className='flex-row items-center mb-3'>
          <Ionicons name='mail-outline' size={24} color={colors.white} />
          <Text className='text-base text-white ml-3'>koffinadege@gmail.com</Text>
        </View>
        <View className='flex-row items-center mb-3'>
          <Ionicons name='call-outline' size={24} color={colors.white} />
          <Text className='text-base text-white ml-3'>+225  0101010101</Text>
        </View>
        <View className='flex-row items-center'>
          <Ionicons name='location-outline' size={24} color={colors.white} />
          <Text className='text-base text-white ml-3'>Koumassi </Text>
        </View>
      </View>

      <View className='flex-row justify-between mb-8 mx-4'>
        <TouchableOpacity className='  rounded-lg p-4 flex-1 items-center mr-3' onPress={() => navigation.navigate('Historique')} style={{backgroundColor: colors.primary}} >
          <Ionicons name='cart-outline' size={24} color={colors.white} />
          <Text className='text-base font-bold text-white mt-2'>Historique</Text>
        </TouchableOpacity>
        <TouchableOpacity className='  rounded-lg p-4 flex-1 items-center mr-3' onPress={() => navigation.navigate('Favoris')} style={{backgroundColor: colors.primary}} >
          <Ionicons name='heart-outline' size={24} color={colors.white} />
          <Text className='text-base font-bold text-white mt-2'>Mes Favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity className=' rounded-lg p-4 flex-1 items-center' style={{backgroundColor: colors.primary}} >
          <Ionicons name='settings-outline' size={24} color={colors.white} />
          <Text className='text-base font-bold text-white mt-2'>Paramètres</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className='mx-4  rounded-lg p-4 flex-row items-center justify-center'style={{backgroundColor: colors.primary}} >
        <Ionicons name='log-out-outline' size={24} color={colors.white} />
        <Text className='text-base font-bold text-white ml-3'>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profil;