import React, { useState } from 'react';
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

const MessagingScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add the user's message to the list
      const userMessage = { id: Date.now().toString(), text: newMessage, sender: 'self' };
      setMessages((prevMessages) => [userMessage, ...prevMessages]);
      setNewMessage('');

      // Simulate an automatic response after a delay
      setTimeout(() => sendAutoResponse(), 1500);
    }
  };

  const sendAutoResponse = () => {
    const fakeResponses = [
      "That's so kind of you!",
      "Really? Tell me more!",
      "Haha, you're funny!",
      "I completely agree!",
      "Thanks for sharing that!",
    ];

    const randomResponse =
      fakeResponses[Math.floor(Math.random() * fakeResponses.length)];

    const botMessage = {
      id: Date.now().toString(),
      text: randomResponse,
      sender: 'other',
    };

    setMessages((prevMessages) => [botMessage, ...prevMessages]);
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("back")}>
          <Icon name="arrow-back-outline" size={30} color="#FF007F" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Icon name="person-circle-outline" size={40} color="#FF007F" />
          <Text style={styles.userName}>John Doh</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        inverted
      />

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
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
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
