import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SearchBar = () => {
  return (
    <View className='flex'>
        <View className='bg-gray-200 p-3 py-2 mt-4 rounded-lg flex flex-row '>
          <Ionicons name='search' size={32} color="gray"/>
          <TextInput placeholder='Chercher un plat ou une boisson' className='flex-1 ml-2'/>
        </View>
       </View>
  )
}

export default SearchBar