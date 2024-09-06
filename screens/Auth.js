import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal, Dimensions } from 'react-native';
import { account, storage } from '../utils/appwrite';
import { colors } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const navigation = useNavigation();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handlePickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      // Créer le compte utilisateur
      const user = await account.create('unique()', email, password, username);

      // Uploader l'image vers Appwrite
      const file = await storage.createFile('pilipili', 'unique()', avatar);

      // Mettre à jour le profil avec l'avatar
      await account.updateProfile({
        name: username,
        avatar: file.$id,
      });

      // Créer une session pour l'utilisateur
      await account.createEmailSession(email, password);

      // Naviguer vers l'écran "Tabs"
      navigation.navigate('Tabs');
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Créer une session pour l'utilisateur
      await account.createEmailSession(email, password);

      // Naviguer vers l'écran "Tabs"
      navigation.navigate('Tabs');
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logo = require('../assets/images/logo.jpg');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View className='-mt-10'>
        <Image source={logo} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
      </View>
      <View style={{ width: '80%', backgroundColor: colors.white, padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {isLoginMode ? 'Connexion' : 'Inscription'}
        </Text>
        {!isLoginMode && (
          <TextInput
            style={styles.input}
            placeholder="Nom d'utilisateur"
            value={username}
            onChangeText={setUsername}
          />
        )}
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!isLoginMode && (
          <TouchableOpacity onPress={handlePickAvatar}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <Text>Sélectionner un avatar</Text>
            )}
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity onPress={handleToggleMode}>
            <Text style={{ color: colors.secondary }}>
              {isLoginMode ? "Vous n'avez pas de compte ? Inscrivez-vous" : 'Vous avez déjà un compte ? Connectez-vous'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: colors.secondary, padding: 10, borderRadius: 5 }}
            onPress={isLoginMode ? handleLogin : handleRegister}
            disabled={isLoading}
          >
            <Text style={{ color: colors.white }}>{isLoginMode ? 'Se connecter' : 'S\'inscrire'}</Text>
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>

      <Modal
        visible={errorModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erreur</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;