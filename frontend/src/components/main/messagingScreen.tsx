import React, { act, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/src/hooks/useAuth';
import Toast from 'react-native-toast-message';

import { database } from '../../../config/firebase'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';

import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';

const MessagingScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { receiverUsername, conv_id, isAnonymous } = route.params
  const { actualUser } = useAuth();

  useLayoutEffect(() => {
    console.log(actualUser)
    const collectionRef = collection(database, conv_id);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          return {
            _id: data._id,
            createdAt: data.createdAt.toDate(),
            text: data.text,
            user: data.user
          }
        })
      );
    });

    return () => unsubscribe();

  }, []);

  const onSend = useCallback((messages = []) => {
    if (!actualUser || !actualUser.username) {
      console.error("User is undefined or missing username");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not authenticated",
      });
      return;
    }
  
    const message = messages[0];
    console.log("Message:", message);
    const { _id, createdAt, text } = message;
    
    // Add message to Firestore
    addDoc(collection(database, conv_id), {
      _id: _id,
      createdAt: createdAt,
      text: text,
      user: {
        _id: actualUser.email,
        name: actualUser.username,
      },
    })
      .then(() => {
        console.log("Message successfully sent!");
      })
      .catch((error) => {
        console.error("An error occurred while sending message:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Message not sent",
        });
      });
  
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Icon name="person-circle-outline" size={40} color="#FF007F" />
          <Text style={styles.userName}>{isAnonymous ? 'Anonymous' : receiverUsername}</Text>
        </View>
      </View>

      {/* Chat */}
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: actualUser?.email
        }}
        messagesContainerStyle={{
          backgroundColor: '#000'
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: '#333' },
              right: { backgroundColor: '#FF007F' },
            }}
            textStyle={{
              left: { color: '#FFF' },
              right: { color: '#FFF' },
            }}
          />
        )}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: '#000',
              borderTopColor: '#444',
            }}
            textInputStyle={{
              color: '#FFF',
            }}
          />
        )}
        renderSend={(props) => (
          <Send {...props}>
            <View style={{ marginRight: 10 }}>
              <Icon name="send" size={24} color="#FF007F" />
            </View>
          </Send>
        )}
      />
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
  }
});
