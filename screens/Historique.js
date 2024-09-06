import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Historique = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  // Simulation de données de commandes
  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        image: require('../assets/images/burger.png'),
        name: 'Burger',
        price: 1500,
        date: '2023-04-05',
      },
      {
        id: 2,
        image: require('../assets/images/pizza.png'),
        name: 'Pizza',
        price: 2000,
        date: '2023-03-15',
      },
      {
        id: 3,
        image: require('../assets/images/tacos.png'),
        name: 'Tacos',
        price: 2500,
        date: '2023-02-20',
      },
    ];
    setOrders(sampleOrders);
  }, []);

  const handleViewOrder = (order) => {
    navigation.navigate('OrderDetails', order);
  };

  return (
    <View className='flex-1 bg-mainColor px-5 py-8'style={{backgroundColor: colors.mainColor}}>
      
      <View className="flex flex-row justify-between items-center mb-4">
      <TouchableOpacity
                onPress={() => navigation.goBack()}
                className='p-2  mb-3 rounded-xl  '
                style={{ backgroundColor: colors.secondary }}
              >
                <Ionicons name="arrow-back-outline" size={30} color="white" />
              </TouchableOpacity>
      <Text className='text-2xl font-bold text-white mb-5 text-center'>Historique des commandes</Text>

<View className="flex"></View>
      </View>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity className='flex-row items-center  rounded-2xl p-3 mb-4'style={{backgroundColor: colors.tertiary}}>
              <Image source={item.image} style={{resizeMode:"contain"}} className='w-16 h-16' />
              <View className='flex-1 ml-4'>
                <Text className='text-base font-bold text-white'>{item.name}</Text>
                <Text className='text-base text-white'>{item.price} CFA</Text>
                <Text className='text-base text-white'>{item.date}</Text>
              </View>
              <TouchableOpacity className=' rounded-lg p-2'style={{backgroundColor: colors.secondary}}>
                <Ionicons name='eye-outline' size={24} color={colors.white} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-base text-white'>Aucune commande dans l'historique.</Text>
        </View>
      )}
    </View>
  );
};

export default Historique;