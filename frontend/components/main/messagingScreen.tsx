import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import { MessageAPI, ConversationAPI } from '@/utils/api';
import LoadingScreen from '../utils/loadingScreen';
import { Message } from '@/models/message';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { API_ENDPOINT } from '@/constants/variables';
import { io } from 'socket.io-client';

const MessagingScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { navigation, receiverUsername, conv_id, isAnonymous } = route.params
  const { user, access_token } = useAuth();


  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const data = {
        conversation_id: conv_id,
        sender_username: user.username,
        content: newMessage
      };
      
      MessageAPI.addNewMessage(data)
      .then((data) => {
        const userMessage = { id: Date.now().toString(), text: newMessage, sender: 'self' };
        setMessages((prevMessages) => [userMessage, ...prevMessages]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error('An error occured', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured',
          text2: 'Message not sent'
        })
      });
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'self' ? styles.selfMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const splitMessages = (messages: Message[]) => {
    return messages.map((message) => {
      return (
      {
        id: message.message_id,
        text: message.content,
        sender: message.sender_username == receiverUsername ? 'other' : 'self'
      })
    })
  }

  useEffect(() => {
    MessageAPI.getMessages(conv_id, setLoading)
    .then((data) => {
      const splittedMessages = splitMessages(data);
      setMessages(splittedMessages);
    })
    .catch((error) => {
      console.error('An error occured', error);
    });

    MessageAPI.markMessagesAsRead(conv_id, user.username);
  }, [])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Icon name="person-circle-outline" size={40} color="#FF007F" />
          <Text style={styles.userName}>{isAnonymous ? 'Anonymous' : receiverUsername}</Text>
        </View>
      </View>

      {/* Messages */}
      {loading ? <LoadingScreen message={"Loading messages"} /> : <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        inverted
      />}

      <Modal
        visible={isEmojiVisible}
        animationType='slide'
        onRequestClose={() => setIsEmojiVisible(false)}
      >
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setNewMessage((prev) => prev + emoji); 
            setIsEmojiVisible(false);
          }}
          showSearchBar={false}
        />
      </Modal>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="happy-outline" size={30} color="#FF007F" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#AAA"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send-outline" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    width: "100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '75%',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
  },
  selfMessage: {
    backgroundColor: '#FF007F',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#FF007F',
    borderRadius: 20,
    padding: 10,
  },
});
