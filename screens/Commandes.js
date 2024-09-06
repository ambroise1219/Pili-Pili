import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';

const PageCommandes = ({ route }) => {
  const navigation = useNavigation();
  const orderData = route.params;

  const optionText = () => {
    switch (orderData.option) {
      case "option1":
        return "pour une personne";
      case "option2":
        return "pour 2 personnes";
      case "option3":
        return "pour 3 personnes";
      default:
        return "";
    }
  };


  return (
    <SafeAreaView className="flex h-full" style={{ backgroundColor: colors.mainColor }}>
      <ScrollView>
        <View>
          {/* En-tête */}
          <View className="flex flex-row items-center justify-between px-4 py-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-xl"
              style={{ backgroundColor: colors.secondary }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Votre Commande</Text>
            <View className="p-2 rounded-xl bg-transparent" />
          </View>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />

          {/* Détails de la commande */}
          <View className="p-4">
            <View className="flex flex-row items-center mb-4">
              <Image source={orderData.item.image} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
              <View className="ml-4">
                <Text className="text-xl font-bold text-white">{orderData.item.name}</Text>
                <Text className="text-gray-400">{orderData.quantity} {orderData.quantity > 1 ? 'portions' : 'portion'}</Text>
              </View>
            </View>

            <View className="border-2 border-gray-600 rounded-lg p-4 mb-4">
              <Text className="text-lg font-bold text-white mb-2">Formule choisie</Text>
              <Text className="text-gray-400">Commande : {optionText()}</Text>
            </View>

            {orderData.checkedItems.length > 0 && (
              <View className="border-2 border-gray-600 rounded-lg p-4 mb-4">
                <Text className="text-lg font-bold text-white mb-2">Accompagnements choisis</Text>
                {orderData.checkedItems.map((item, index) => (
                  <Text key={index} className="text-gray-400">
                    - {item}
                  </Text>
                ))}
              </View>
            )}

            {orderData.specialInstructions && (
              <View className="border-2 border-gray-600 rounded-lg p-4 mb-4">
                <Text className="text-lg font-bold text-white mb-2">Instructions spéciales</Text>
                <Text className="text-gray-400">{orderData.specialInstructions}</Text>
              </View>
            )}

            {orderData.checkedAdditifsSupplementaires.length > 0 && (
              <View className="border-2 border-gray-600 rounded-lg p-4 mb-4">
                <Text className="text-lg font-bold text-white mb-2">Additifs supplémentaires</Text>
                {orderData.checkedAdditifsSupplementaires.map((item, index) => (
                  <Text key={index} className="text-gray-400">
                    - {item}
                  </Text>
                ))}
              </View>
            )}

            {/* Coût total */}
            <View className="flex justify-end mb-4">
              <Text className="text-3xl font-bold text-white">Coût total : {orderData.totalCost} CFA</Text>
            </View>
          </View>

          {/* Bouton de validation */}
          <TouchableOpacity
            className="flex justify-center items-center py-4 mx-4 mb-4 rounded-xl"
            style={{ backgroundColor: colors.secondary }}
            onPress={() => navigation.navigate('Map', orderData)}
          >
            <Text className="text-lg text-white font-bold">Valider la Commande</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageCommandes;