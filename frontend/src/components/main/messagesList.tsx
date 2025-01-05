import React, { useEffect, useState } from 'react';
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

const Conversations = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { actualUser } = useAuth();

  useEffect(() => {
    ConversationAPI.getConversations(actualUser.username, setLoading)
    .then((data) => {
      setConversations(data);
    })
    .catch((error) => {
      console.error('An error occured', error);
    })
  }, []);

  const deleteConversation = (id) => {
    ConversationAPI.deleteConversation(id)
    .then((data) => {
      setConversations((prevConversations) =>
        prevConversations.filter((conversation) => conversation.conv_id !== id)
      );
    })
    .catch((error) => {
      console.error('An error occured', error);
    })
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversation}
      onPress={() => navigation.navigate("messaging", {
        navigation: navigation,
        receiverUsername: item.recipient_username == actualUser.username ? item.initiator_username : item.recipient_username,
        conv_id: item.conv_id,
        isAnonymous: item.is_anonymous
      })}
    >
      <View style={styles.conversationInfo}>
        <Icon name="chatbubble-outline" size={25} color="#FFF" style={styles.chatIcon} />
        <View>
          {item.is_anonymous ? <Text style={styles.userName}>Anonymous</Text> : 
          <Text style={styles.userName}>{
            item.recipient_username == actualUser.username ? item.initiator_username : item.recipient_username}
          </Text>}

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
        keyExtractor={(item) => item.id}
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
