import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import haversine from 'haversine-distance';

const Map = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Modal, setModal] = useState(true)

  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require('./../assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-Medium": require('./../assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('./../assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-SemiBold": require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    "MadimiOne": require('./../assets/fonts/MadimiOne.ttf'),
    "Pacifico": require('./../assets/fonts/Pacifico.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
  } 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Coordonnées de la boutique
  const PilipiliCoordinates = {
    latitude: 5.383317431447657,
    longitude: -3.9716336506611594,
  };

  // Extract data from the JSON file
  const { checkedItems, item: { image, name }, option, quantity, specialInstructions, totalCost, checkedAdditifsSupplementaires } = item;

  // Update order summary with actual data
  const orderSummary = {
    items: [{ name, quantity }], // Assuming "item" in JSON refers to the ordered item
    checkedItems, // Include checked items from JSON
    totalCost,
    checkedAdditifsSupplementaires
  };

  const deliveryPerson = {
    name: 'Armand Koffi',
    photo: require('../assets/images/livreur.png'),
    contact: '+225 0103458596',
    status: 'En route',
    estimatedDeliveryTime: '20 min',
  }; 


  // Calculer la distance entre l'utilisateur et la boutique
  const distance = haversine(
    { latitude: location?.coords.latitude, longitude: location?.coords.longitude },
    PilipiliCoordinates
  );

  // Estimer le temps de livraison en fonction de la distance
  const estimatedDeliveryTime = `${Math.round(distance / 1000 * 60)} min`;

  return (

    
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marqueur pour la position du livreur (assuming it's not provided) */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Votre position"
            description="Votre position actuelle"
          >
            <Image
              source={require('../assets/images/avatar.png')}
              style={{ width: 40, height: 40, borderRadius:50 }}
              resizeMode="contain"
            />
          </Marker>

          {/* Marqueur personnalisé pour la boutique */}
          <Marker
            coordinate={PilipiliCoordinates}
            title="Pili Pili"
            description="Restaurant"
          >
            <Image
              source={require('../assets/images/logo.jpg')}
              style={{ width: 40, height: 40, borderRadius:50 }}
              resizeMode="contain"
            />
          </Marker>

          {/* Ligne reliant la position de l'utilisateur à celle de la boutique */}
          <Polyline
            coordinates={[
              { latitude: location.coords.latitude, longitude: location.coords.longitude },
              PilipiliCoordinates,
            ]}
            strokeColor={colors.secondary}
            strokeWidth={3}
          />
        </MapView>
      )}
      {/* En-tête */}
      <View className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-xl" style={{ backgroundColor: colors.secondary }}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-400">Suivre ma commande</Text>
        <View className="p-2 rounded-xl bg-transparent" />
      </View>

      {/* Informations du livreur et de la commande */}
      <View className="absolute -bottom-8  left-0 right-0 bg-white rounded-t-3xl p-8 mx-4">
      
        {/* Partie 1 */}
        <View className="flex flex-row items-center justify-between mb-4">
        <View className='flex flex-row items-center'>
            <View className=" p-1 " style={{backgroundColor: colors.secondary, borderRadius: 15}} >
              <Image source={deliveryPerson.photo} style={{ width: 60, height: 60,marginBottom:-4, borderRadius:10  }}  />
            </View>
            <View className="ml-4">
              <Text className="text-lg font-bold">{deliveryPerson.name}</Text>
              <View className="flex flex-row py-2">
                <Ionicons name='time' color={colors.tertiary} size={20} />
                <Text className="text-gray-500 ml-1">{estimatedDeliveryTime}</Text>
              </View>
            </View>
          </View>

          {/* Partie 2 */}
          <View className='flex flex-row items-center'>
           <Image source={require('../assets/images/animation.gif')} style={{width:150, height:150, resizeMode:'contain'}} />
             
          </View>

          {/* Partie 3*/}
          
        </View>

        <View className="mb-4 ">
          
       
        </View>

        <View className="mb-4 flex flex-row items-center">
          <TouchableOpacity className='flex-1 flex-row mx-4 p-2 rounded-full' >
            <View className=" flex-1 flex-row border-2 justify-center py-2 items-center mr-2 "style={{backgroundColor: colors.white, borderRadius: 15, padding: 4, borderColor: colors.secondary}}>
              <Ionicons name='call' size={30} color={colors.secondary} />
              <Text className="text-lg font-semibold text-amber-500" >Appeler</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Message")}>
            <View className="flex p-2 rounded-2xl mr-6"style={{backgroundColor: colors.secondary}}>
              <Ionicons name='mail' size={30} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Map;