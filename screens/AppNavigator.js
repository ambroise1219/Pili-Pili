import * as React from 'react';
import { Animated, Easing, View, Dimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import Favoris from './Favoris';
import Commandes from './Commandes';
import Profil from './Profil';
import PageProduit from './PageProduit';
import { colors } from '../constant/theme';
import Menus from './Menus';
import Map from './Map';
import Historique from './Historique';
import Message from './Message';
import AuthScreen from './Auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = { headerShown: false }; // Hide the default header

const { width } = Dimensions.get('window');

const TabBarIndicator = ({ route, focused, animatedValue, tabWidth }) => {
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [tabWidth * (route.index - 1), tabWidth * route.index],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: tabWidth,
        height: '100%',
        backgroundColor: focused ? 'black' : 'transparent',
        transform: [{ translateX }],
      }}
    />
  );
};

const HomeTabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState('Home');
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const tabWidth = width / 4;

  const handleTabChange = (route) => {
    setActiveTab(route.name);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favoris') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Commandes') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} className='p-2 m-8'>
                <Ionicons name={iconName} size={size} color={focused ? 'white' : 'black'} />
                <Text style={{ color: focused ? 'white' : 'black', marginLeft: 5 }}>{route.name}</Text>
              </View>
            );
          },
          tabBarStyle: {
            height: 72, 
            elevation: 8, 
            position: 'absolute',
            bottom: 2,
            left: 0,
            right: 0,
          },
          headerShown: false
        })}
      >
<Tab.Screen
  name="Accueil"
  component={Home}
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <View className={`focused ? "flex top-1.5 flex-row items-center justify-center ml-3 " : "`} style={{backgroundColor: focused ? colors.secondary : colors.primary,
      padding: 12, borderRadius: 15, top : focused ? 5 : 5}}>
        <Ionicons name="planet" size={size} color={focused ? 'white' : "white"} />
        <Text className="text-white text-sm font-semibold ml-2" >Accueil</Text>
      </View >
    ),
    tabBarLabel: '', // Masque le texte
    tabBarStyle: {
      backgroundColor: colors.primary,
      height: 70, 
      elevation: 8,
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
  }}
/>
<Tab.Screen
  name="Favoris"
  component={Favoris}
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <View className={`focused ? "flex   flex-row items-center justify-center ml-3 transition-all " : "`} style={{backgroundColor: focused ? colors.secondary : colors.primary,
      padding: 12, borderRadius: 15, top : focused ? 5 : 5}}>
        <Ionicons name="heart" size={size} color={focused ? 'white' : "white"} />
        <Text className="text-white text-sm font-semibold ml-2" >Favoris</Text>
      </View >
    ),
    tabBarLabel: '', // Masque le texte
    tabBarStyle: {
      backgroundColor:colors.primary,
      height: 70, 
      elevation: 8,
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
  }}
/>
<Tab.Screen
  name="Message"
  component={Message}
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <View className={`focused ? "flex top-1.5 flex-row items-center justify-center ml-3 " : "`} style={{backgroundColor: focused ? colors.secondary :colors.primary,
      padding: 12, borderRadius: 15,top : focused ? 4 : 4}}>
        <Ionicons name="mail" size={size} color={focused ? 'white' : "white"} />
        <Text className="text-white text-sm font-semibold ml-2" >Message </Text>
      </View >
    ),
    tabBarLabel: '', // Masque le texte
    tabBarStyle: {
      backgroundColor:  colors.primary,
      height: 70, 
      elevation: 8,
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
  }}
/>
<Tab.Screen
  name="Profil"
  component={Profil}
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <View className={`focused ? "flex top-1.5 flex-row items-center justify-center ml-3 mr-3 " : "`} style={{backgroundColor: focused ? colors.secondary : colors.primary,
      padding: 12, borderRadius: 15,top : focused ? 5 : 5}}>
        <Ionicons name="person-circle" size={size} color={focused ? 'white' : "white"} />
        <Text className="text-white text-sm font-semibold ml-2" >Profil</Text>
      </View >
    ),
    tabBarLabel: '', // Masque le texte
    tabBarStyle: {
      backgroundColor: colors.primary,
      height: 70, 
      elevation: 8,
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
  }}
/>
      </Tab.Navigator>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
      <TabBarIndicator
  route={{ name: 'Home', index: 0 }}
  focused={activeTab === 'Home'}
  animatedValue={animatedValue}
  tabWidth={tabWidth}
  style={{ 
    width: 50, // Largeur du fond
    height: 15, // Hauteur du fond
    position: 'absolute', // Positionnement du fond
    bottom: 0, // Position verticale du fond
    left: 0, // Position horizontale du fond
    transform: [{ translateY: animatedValue }], 
  }}
/>

        <TabBarIndicator
          route={{ name: 'Favoris', index: 1 }}
          focused={activeTab === 'Favoris'}
          animatedValue={animatedValue}
          tabWidth={tabWidth}
        />
        <TabBarIndicator
          route={{ name: 'Commandes', index: 2 }}
          focused={activeTab === 'Commandes'}
          animatedValue={animatedValue}
          tabWidth={tabWidth}
        />
        <TabBarIndicator
          route={{ name: 'Profil', index: 3 }}
          focused={activeTab === 'Profil'}
          animatedValue={animatedValue}
          tabWidth={tabWidth}
        />
      </View>
    </View>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Tabs'>
        <Stack.Screen name="Tabs" component={HomeTabNavigator} />
        <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
        <Stack.Screen name="PageProduit" component={PageProduit} options={{ headerShown: false }} />
        <Stack.Screen name="Menus" component={Menus} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="Historique" component={Historique} options={{ headerShown: false }} />
        <Stack.Screen name="Commandes" component={Commandes} options={{ headerShown: false }} />
        <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;