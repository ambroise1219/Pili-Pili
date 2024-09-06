import { View, Text, Modal, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Accompagnement = ({isVisible, onClose}) => {
 
  return (
    <View className="bg-white rounded-t-3xl p-4">
    {/* Contenu du Modal */}
    <Text className="text-2xl font-bold mb-4">Les accompagnements</Text>
    <View>
      {/* Liste des cases à cocher */}
      <View className="flex-row items-center mb-2">
        <TouchableOpacity
          onPress={() => {
            // Logique pour cocher/décocher la case
          }}
          style={{
            backgroundColor: colors.secondary,
            padding: 8,
            borderRadius: 4,
          }}
        >
          {/* Icône de case à cocher */}
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
        <Text className="ml-2">Frites</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            padding: 8,
            borderRadius: 4,
          }}
        >
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
        <Text className="ml-2">Riz</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            padding: 8,
            borderRadius: 4,
          }}
        >
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
        <Text className="ml-2">Salade</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            padding: 8,
            borderRadius: 4,
          }}
        >
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
        <Text className="ml-2">Sauce</Text>
      </View>
    </View>
    <TouchableOpacity
      onPress={handleCloseModal}
      className="p-2 mt-4 rounded-lg"
      style={{ backgroundColor: colors.secondary }}
    >
      <Text className="text-white font-bold">Fermer</Text>
    </TouchableOpacity>
  </View>
);
};
 

export default Accompagnement