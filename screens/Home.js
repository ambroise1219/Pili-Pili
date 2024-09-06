import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Caroussel from '../components/Caroussel';
import MenuCategory from '../components/MenuCategory';  
import { supabase } from '../utils/supabase';


const Home = () => { 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel')
          .select('*');

        if (error) {
          console.error('Erreur lors de la récupération des données :', error);
        } else {
          console.log('Données du carousel :', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

 
   
  return (
    <SafeAreaView className='p-2'>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header />
       {/* Barre de recherche */}

      <SearchBar />

       {/* Caroussel */}
      <Caroussel />
       {/* Nos menus */}

       <MenuCategory />
       </ScrollView>
    </SafeAreaView>
  )
}

export default Home