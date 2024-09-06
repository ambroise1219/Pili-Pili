import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFavoriteProducts, useRemoveFavoriteProduct } from '../backend/store/favoritesStore';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Favoris = () => {
  const favoriteProducts = useFavoriteProducts();
  const removeFavoriteProduct = useRemoveFavoriteProduct();
  const navigation = useNavigation();

  const handleRemoveFromFavorites = (product) => {
    removeFavoriteProduct(product.id);
  };

  const handleNavigateToProduct = (product) => {
    navigation.navigate('PageProduit', product);
  };

  return (
    <View className="flex h-full px-4 py-6" style={{backgroundColor: colors.mainColor}}>
    <View className='border border-gray-400 border-t-0 border-l-0 border-r-0'>
    <Text className="text-4xl text-center font-bold text-white mb-4">Mes Favoris</Text>
    </View>
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row items-center bg-white rounded-2xl p-3 mb-3"
              onPress={() => handleNavigateToProduct(item)}
            >
              <Image source={item.image} style={{resizeMode:"contain"}} className="w-16 h-16 " />
              <View className="flex-1 ml-4">
                <Text className="text-xl font-bold text-tertiary">{item.name}</Text>
                <Text className="text-lg text-secondary">{item.price} CFA</Text>
              </View>
              <TouchableOpacity
                className="bg-secondary p-2 rounded-lg"
                onPress={() => handleRemoveFromFavorites(item)}
              >
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-white">
            Vous n'avez pas encore ajouté de produits à vos favoris.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favoris;