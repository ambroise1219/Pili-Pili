import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  // Simulation de données de messages
  useEffect(() => {
    const sampleMessages = [
     
      {
        id: 1,
        senderImage: require('../assets/images/portrait2.png'),
        senderName: 'Mr Albert Kouassi',
        message: 'Est-ce que vous pouvez me donner plus d\'informations sur les accompagnements ?',
        timestamp: '2023-04-07 15:45',
        isUserMessage: false,
      },
      {
        id: 2,
        senderImage: require('../assets/images/portrait.png'),
        senderName: 'Anne Marie',
        message: 'Oui bien-sûr, veuillez patientez un instant je vous prie.',
        timestamp: '2023-04-05 19:20',
        isUserMessage: false,
      },
    ];
    setMessages(sampleMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        id: messages.length + 1,
        senderImage: require('../assets/images/portrait2.png'),
        senderName: 'Vous',
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        isUserMessage: true,
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View
      className="flex-1 px-5 py-8"
      style={{ borderColor: colors.mainColor, backgroundColor: colors.primary }}
    >
      <Text className="text-2xl font-bold text-white mb-5">Messages</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={` rounded-2xl p-4 mb-4 ${item.isUserMessage ? 'self-end' : 'self-start'}`}
            style={{ borderColor: colors.tertiary }}
          > 
            <View className="flex-row items-center justify-between   w-full">
              <View className="flex-row items-center  ">
                <Image source={item.senderImage} className="w-12 h-12 rounded-full" />
                <Text className="text-base font-bold text-white ml-3 ">{item.senderName}</Text>
              </View>
              <Text className="text-base text-white">{item.timestamp}</Text>
            </View>
            <Text className="text-base text-white mt-3">{item.message}</Text>
          </View>
        )}
      />
      <View
        className="flex-row items-center rounded-xl p-3 mt-4"
        style={{ borderColor: colors.tertiary, backgroundColor: colors.secondary }}
      >
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrivez un message..."
          className="flex-1 text-base text-white"
          placeholderTextColor={colors.gray}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;