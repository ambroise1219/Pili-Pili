import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { boutique } from '../constant';
import {
  useFavoriteProducts,
  useAddFavoriteProduct,
  useRemoveFavoriteProduct,
  useIsFavoriteProduct,
} from '../backend/store/favoritesStore';

const PageProduit = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkmode] = useState(true);
  const [counter, setCounter] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [checkedAdditifs, setCheckedAdditifs] = useState({
    frites: false,
    Alloco: false,
    Eau: false,
    Fanta: false,
    coca: false,
    orangina: false,
  });

  const [checkedAdditifsSupplementaires, setCheckedAdditifsSupplementaires] = useState({
    // Liste des additifs supplémentaires
  });

  const handleCheckboxChange = (item, type) => {
    if (type === 'additif') {
      setCheckedAdditifs((prevState) => ({
        ...prevState,
        [item]: !prevState[item],
      }));
      updateCheckedItems(item, 'additif');
    } else if (type === 'additifSupplementaire') {
      setCheckedAdditifsSupplementaires((prevState) => ({
        ...prevState,
        [item]: !prevState[item],
      }));
      updateCheckedItems(item, 'additifSupplementaire');
    }
  };

  const [orderData, setOrderData] = useState({
    option: null,
    quantity: 0,
    totalCost: 0,
    checkedItems: [],
    checkedAdditifsSupplementaires: [],
    specialInstructions: '',
  });

  const handleOpenModal = () => {
    const updatedOrderData = {
      ...orderData,
      item: {
        image: item.image,
        name: item.name,
      },
    };
    setOrderData(updatedOrderData);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => setIsModalVisible(false);

  const incrementer = () => {
    setCounter(counter + 1);
    handleQuantityChange(counter + 1);
  };

  const decremente = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      handleQuantityChange(counter - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkmode(!darkMode);
  };

  const favoriteProducts = useFavoriteProducts();
  const addFavoriteProduct = useAddFavoriteProduct();
  const removeFavoriteProduct = useRemoveFavoriteProduct();
  const isProductFavorite = useIsFavoriteProduct(item.id);

  const toggleLike = () => {
    if (isProductFavorite) {
      removeFavoriteProduct(item.id);
    } else {
      addFavoriteProduct(item);
    }
    setIsLiked(!isLiked);
  };

  const toggleChoixCommande = (option) => {
    if (option === selectedOption) {
      setSelectedOption(null);
      handleOptionChange(null);
    } else {
      setSelectedOption(option);
      handleOptionChange(option);
    }
  };

  const updateCheckedItems = (item, type) => {
    if (type === 'additif') {
      const updatedCheckedItems = checkedAdditifs[item]
        ? orderData.checkedItems.filter((i) => i !== item)
        : [...orderData.checkedItems, item];

      setOrderData({
        ...orderData,
        checkedItems: updatedCheckedItems,
      });
    } else if (type === 'additifSupplementaire') {
      const updatedCheckedAdditifsSupplementaires = checkedAdditifsSupplementaires[item]
        ? orderData.checkedAdditifsSupplementaires.filter((i) => i !== item)
        : [...orderData.checkedAdditifsSupplementaires, item];

      setOrderData({
        ...orderData,
        checkedAdditifsSupplementaires: updatedCheckedAdditifsSupplementaires,
      });
    }
  };

  const handleSpecialInstructionsChange = (text) => {
    setOrderData({
      ...orderData,
      specialInstructions: text,
    });
  };

  const handleOptionChange = (option) => {
    let unitCost = 0;
    if (option === 'option1') {
      unitCost = item.price;
    } else if (option === 'option2') {
      unitCost = item.price * 1.8;
    } else if (option === 'option3') {
      unitCost = item.price * 3.6;
    }
    const totalCost = unitCost * counter;

    setOrderData({
      ...orderData,
      option,
      totalCost,
    });
  };

  const handleQuantityChange = (value) => {
    let unitCost = 0;
    if (orderData.option === 'option1') {
      unitCost = item.price;
    } else if (orderData.option === 'option2') {
      unitCost = item.price * 1.8;
    } else if (orderData.option === 'option3') {
      unitCost = item.price * 3.6;
    }
    const totalCost = unitCost * value;

    setOrderData({
      ...orderData,
      quantity: value,
      totalCost,
    });
  };
  const handleAddToCart = () => {
    if (orderData.option) {
      const updatedOrderData = {
        ...orderData,
        item: {
          image: item.image,
          name: item.name,
        },
      };
      setOrderData(updatedOrderData);
      setIsModalVisible(true);
    } else {
      alert("Veuillez choisir une option avant d'ajouter au panier.");
    }
  };

  return (
    <SafeAreaView>
      <View className='flex h-full' style={{ backgroundColor: darkMode ? colors.mainColor : 'white' }}>
        {/* En-tête */}
        <View className='flex flex-row'>
          <View className='flex-1 items-start '>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='p-2 m-3 rounded-xl'
              style={{ backgroundColor: colors.secondary }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleLike}
            className='p-2 m-3 rounded-xl'
            style={{ backgroundColor: colors.tertiary }}
          >
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={30} color={isLiked ? 'red' : 'white'} />
          </TouchableOpacity>
        </View>

        {/* Image du produit */}
        <View className='flex -mt-4 p-2 items-center'>
          <Image source={item.image} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
        </View>

        {/* Informations sur le produit */}
        <View className='flex'>
          <View className='flex flex-row p-2 mx-2 items-center'>
            <Ionicons name="star" size={30} color="orange" />
            <Text className='text-2xl font-bold ml-2' style={{ color: darkMode ? 'white' : 'dimgray' }}>3.5</Text>
          </View>
          <View>
            <View className='flex p-2 mx-2'>
              <Text className='text-5xl font-bold  ' style={{ color: darkMode ? 'white' : 'dimgray' }}>{item.name}</Text>
            </View>
            <View className='flex pl-2 mx-2 flex-row'>
              <Text className='text-gray-400 text-lg mr-4'>130 grammes</Text>
              <Text className='text-gray-400 text-3xl mr-4'>-</Text>
              <Text className='text-gray-400 text-lg'>300 calories</Text>
            </View>
          </View>
        </View>

        {/* Options */}
        <View className='flex mx-2 p-2 flex-row justify-between'>
          <TouchableOpacity
            onPress={() => toggleChoixCommande('option1')}
            className={`rounded-2xl p-4 px-3 border-2 ${selectedOption === 'option1' ? 'border-green-400' : 'border-gray-300'}`}
          >
            <Text className='text-lg font-bold' style={{ color: darkMode ? 'white' : colors.tertiary }}>{item.price} CFA</Text>
            <Text className='  text-sm font-bold' style={{ color: darkMode ? 'white' : '#808b97' }}>Pour 1 personnes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleChoixCommande('option2')}
            className={`rounded-2xl p-4 px-3 border-2 ${selectedOption === 'option2' ? 'border-green-400' : 'border-gray-300'}`}
          >
            <Text className='text-lg font-bold' style={{ color: darkMode ? 'white' : colors.tertiary }}>{item.price * 1.8} CFA</Text>
            <Text className='  text-sm font-bold' style={{ color: darkMode ? 'white' : '#808b97' }}>Pour 2 personnes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleChoixCommande('option3')}
            className={`rounded-2xl p-4 px-3 border-2 ${selectedOption === 'option3' ? 'border-green-400' : 'border-gray-300'}`}
          >
            <Text className='text-lg font-bold' style={{ color: darkMode ? 'white' : colors.tertiary }}>{item.price * 3.6} CFA</Text>
            <Text className='  text-sm font-bold' style={{ color: darkMode ? 'white' : '#808b97' }}>Pour 3 personnes</Text>
          </TouchableOpacity>
        </View>



        {/* Quantité */}
        <View className='flex flex-row mt-4 justify-between items-center'>
          <View className='flex-1 items-center  flex-row ml-2'>
            {/* Décrementer */}
            <TouchableOpacity onPress={decremente} className='p-2 mx-2' style={{ backgroundColor: colors.secondary, borderRadius: 10 }}>
              <Ionicons name='remove' size={34} color='white' />
            </TouchableOpacity>

            {/* Compteur */}
            <Text className='text-3xl font-bold  ' style={{ color: darkMode ? 'white' : 'dimgray' }}>{counter}</Text>

            {/* Incrémenter */}
            <TouchableOpacity onPress={incrementer} className='p-2 mx-2' style={{ backgroundColor: colors.secondary, borderRadius: 10 }}>
              <Ionicons name='add' size={34} color='white' />
            </TouchableOpacity>
          </View>

          {/* Coût Total */}
          <View className='flex-1 justify-end items-end'>
            <Text className='text-4xl font-bold  mr-4' style={{ color: darkMode ? 'white' : 'dimgray' }}>
              {orderData.totalCost} CFA
            </Text>
          </View>
        </View>

        {/* Bouton ajouter au panier et Modal des additifs */}
        <TouchableOpacity
          className="flex p-2 mx-4 mt-8 items-center justify-center rounded-xl py-4 flex-row"
          style={{ backgroundColor: orderData.option ? colors.secondary : 'gray' }}
          onPress={handleAddToCart}
          disabled={!orderData.option}
        >
          <Ionicons name='cart' size={30} color='white' />
          <Text className='text-2xl font-bold text-white'>
            {orderData.option ? 'Ajouter au panier' : ' Veuillez choisir une option'}
          </Text>
        </TouchableOpacity>
        {/* Modal */}
        <Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
>
  <ScrollView showsVerticalScrollIndicator={false}>
    <View className="flex-1 justify-end">
      <View className="bg-white rounded-t-3xl px-6 py-8">
        {/* Contenu du Modal */}
        <View className="flex items-center">
          <Text className="text-2xl font-bold mb-6">Accompagnements</Text>
          <TouchableOpacity onPress={handleCloseModal} className="absolute top-4 right-4">
            <Ionicons name="close-outline" size={30} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Accompagnement obligatoires */}
        <View>
          <Text className="text-xl mb-4 text-gray-800">Les accompagnement Solo <Text className='text-gray-500'>(Obligatoire)</Text></Text>
          {boutique[0].additifs.map((item, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <TouchableOpacity className='flex flex-row items-center'
                onPress={() => handleCheckboxChange(item.name, 'additif')}>
                <View style={{
                  backgroundColor: checkedAdditifs[item.name] ? colors.secondary : 'transparent',
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: colors.secondary
                }}>
                  {checkedAdditifs[item.name] && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </View>
                <Text className="ml-3 text-lg">{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Boisson */}
        <View className='border-t border-gray-300 pt-4 mt-4'>
          <Text className="text-xl mb-4 text-gray-500">Boissons</Text>
          {/* Liste des cases à cocher */}
          {boutique[0].boissons.map((item, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <TouchableOpacity className='flex flex-row items-center'
                onPress={() => handleCheckboxChange(item.name, 'additif')}>
                <View style={{
                  backgroundColor: checkedAdditifs[item.name] ? colors.secondary : 'transparent',
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: colors.secondary
                }}>
                  {checkedAdditifs[item.name] && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </View>
                <Text className="ml-3 text-lg">{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Morceau supplémentaire */}
        <View className='border-t border-gray-300 pt-4 mt-4'>
          <Text className="text-xl mb-4 text-gray-500">Envie de morceaux supplémentaires ?</Text>
          {/* Liste des cases à cocher */}
          {boutique[0].morceauSupplementaire.map((item, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <TouchableOpacity className='flex flex-row items-center'
                onPress={() => handleCheckboxChange(item.name, 'additifSupplementaire')}>
                <View style={{
                  backgroundColor: checkedAdditifsSupplementaires[item.name] ? colors.secondary : 'transparent',
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: colors.secondary
                }}>
                  {checkedAdditifsSupplementaires[item.name] && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </View>
                <Text className="ml-3 text-lg">{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Accompagnement supplémentaire */}
        <View className='border-t border-gray-300 pt-4 mt-4'>
          <Text className="text-xl mb-4 text-gray-500">Des accompagnements supplémentaires ?</Text>
          {/* Liste des cases à cocher */}
          {boutique[0].additifSupplementaire.map((item, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <TouchableOpacity className='flex flex-row items-center'
                onPress={() => handleCheckboxChange(item.name, 'additifSupplementaire')}>
                <View style={{
                  backgroundColor: checkedAdditifsSupplementaires[item.name] ? colors.secondary : 'transparent',
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: colors.secondary
                }}>
                  {checkedAdditifsSupplementaires[item.name] && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </View>
                <Text className="ml-3 text-lg">{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className='mt-4'>
          <Text className='text-slate-700 text-xl'>
            Instructions spéciales
          </Text>
          <View className='border-2 border-gray-300 rounded-xl my-2'>
            <TextInput
              placeholder='Exemple: Pas de poivre/sucre/sel SVP '
              className='p-3'
              onChangeText={handleSpecialInstructionsChange}
            />
          </View>
        </View>

        <View className="flex flex-row justify-between mt-6">
          <TouchableOpacity
            onPress={() => navigation.navigate("Commandes", orderData, item)}
            className='flex justify-center items-center py-4   rounded-lg w-[48%]'
         style={{backgroundColor: colors.secondary}} >
            <Text className='text-lg text-white font-bold'>Aller au Panier</Text>
          </TouchableOpacity>

          {/* Fermer le Modal */}
          <TouchableOpacity
            onPress={handleCloseModal}
            className="flex justify-center items-center py-4   rounded-lg w-[48%]"
            style={{backgroundColor: colors.primary}}>
            <Text className="text-white font-bold text-center">Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
</Modal>
      </View>
    </SafeAreaView>
  );
};

export default PageProduit;