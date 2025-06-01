import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotFound from '../utils/notFound';
import { ConversationAPI } from '@/src/utils/api';
import { useAuth } from '@/src/hooks/useAuth';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../config/firebase"; // Your Firebase configuration
import { useFocusEffect } from '@react-navigation/native';

const Conversations = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { actualUser } = useAuth();

  useFocusEffect(
    useCallback(() => {
      ConversationAPI.getConversations(actualUser.username, setLoading)
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => {
        console.error('An error occured', error);
      })
    }, [])
  );

  const deleteFirebaseCollection = async (collectionPath) => {
    try {
      const collectionRef = collection(database, collectionPath);
      const snapshot = await getDocs(collectionRef);
  
      // Loop through all documents and delete them
      const deletePromises = snapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(database, collectionPath, docSnapshot.id))
      );
  
      // Wait for all deletions to complete
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  }

  const deleteConversation = (id) => {
    ConversationAPI.deleteConversation(id)
    .then((data) => {
      deleteFirebaseCollection(`/${id}`);
      setConversations((prevConversations) =>
        prevConversations.filter((conversation) => conversation.conv_id !== id)
      );
    })
    .catch((error) => {
      console.error('An error occured', error);
    })
  };

  const updateConvesationStatus = async (id) => {
    const data = { recipient_opened: true };
    ConversationAPI.updateConversation(id, data)
    .catch((error) => {
      console.error('An error occured', error);
    })
  }

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={ item.recipient_username === actualUser.username ? item.recipient_opened ? styles.conversation : styles.conversationNotOpened : styles.conversation}
      onPress={() => {
        updateConvesationStatus(item.conv_id);
        navigation.navigate("messaging", {
          receiverUsername: item.recipient_username == actualUser.username ? item.initiator_username : item.recipient_username,
          conv_id: item.conv_id,
          isAnonymous: item.is_anonymous,
          isRecipient: item.recipient_username === actualUser.username
        });
      }}
    >
      <View style={styles.conversationInfo}>
        <Icon name="chatbubble-outline" size={25} color="#FFF" style={styles.chatIcon} />
        <View>
          <Text style={styles.userName}>{
            item.recipient_username == actualUser.username ? item.initiator_username : item.recipient_username}
          </Text>
          {/* <Text style={styles.lastMessage}>{item.created_at}</Text> */}
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteConversation(item.conv_id)}>
        <Icon name="trash-outline" size={25} color="#FF007F" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filterdConversations = conversations.filter(
    (conv) => conv.recipient_username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#FFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search user"
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Conversations List */}
      {filterdConversations.length > 0 ? <FlatList
        data={filterdConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.conv_id}
        contentContainerStyle={styles.conversationsList}/>
        : <NotFound message={"No messages found..."} />
        }

      {/* <NavBar /> */}
    </View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%'
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  conversationsList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  conversation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  conversationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationNotOpened: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderColor: '#FF007F',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  chatIcon: {
    marginRight: 15,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#AAA',
    fontSize: 14,
  }
});
