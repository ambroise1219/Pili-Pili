import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';

const MenuItems = ({ products }) => {
  const isLargeScreen = Dimensions.get('window').width >= 768; // Définir la taille minimale pour les grands écrans
const navigation= useNavigation()
  const renderProducts = () => {
    const rows = [];
    let currentRow = [];
    const itemsPerRow = isLargeScreen ? 4 : 3; // Nombre d'éléments par ligne

    products.forEach((product, index) => {
      currentRow.push(
        <TouchableOpacity
            onPress={()=> navigation.navigate('PageProduit', product)}
          key={product.id}
          className="flex items-center justify-center p-2 rounded-xl"
          style={{ backgroundColor: colors.secondary }}
        >
          <Image
            source={product.image}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
          <Text className="text-slate-100 font-semibold mt-2 text-xl">
            {product.name}
          </Text>
        </TouchableOpacity>
      );

      if ((index + 1) % itemsPerRow === 0 || index === products.length - 1) {
        rows.push(
          <View
            key={`row-${index}`}
            className="flex justify-evenly mt-4 items-center flex-row"
          >
            {currentRow}
          </View>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  return <View className="flex">{renderProducts()}</View>;
};

export default MenuItems;