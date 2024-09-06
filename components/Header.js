import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/theme';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Localisation en cours');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Erreur de localisation",
          "Permission to access location was denied",
          [{ text: "OK" }]
        );
        return;
      }

      try {
        console.log('Fetching location...');
        let userLocation = await Location.getCurrentPositionAsync({});
        console.log('Location fetched:', userLocation);
        setLocation(userLocation);

        if (userLocation) {
          const latitude = userLocation.coords.latitude;
          const longitude = userLocation.coords.longitude;
          const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await fetch(nominatimUrl);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.address) {
              const formattedAddress = `${data.address.road || ''} ${data.address.house_number || ''}, ${data.address.city || ''}`;
              setAddress(formattedAddress);
            } else {
              Alert.alert(
                "Erreur de localisation",
                "No address found",
                [{ text: "OK" }]
              );
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            Alert.alert(
              "Erreur de localisation",
              "Erreur lors de la récupération de l'adresse",
              [{ text: "OK" }]
            );
          }
        }
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert(
          "Erreur de localisation",
          "Erreur lors de la récupération de la localisation",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  return (
    <View className='flex flex-row'>
      <View className='flex-1 flex-row items-center'>
        <View>
          <Ionicons name='location' size={36} color={colors.primary} />
        </View>
        <View>
          <Text className="text-gray-400 text-lg">
            Adresse de livraison
          </Text>
          <Text className='text-lg font-bold text-slate-800'>
            {address}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profil')} className='flex'>
        <Image source={require('../assets/images/portrait.png')} style={{ width: 45, height: 45, borderRadius: 10, resizeMode: 'contain' }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
