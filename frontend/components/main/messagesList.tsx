import React, { useState } from 'react';
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

const Conversations = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState([
    { id: '1', name: 'John Doe', lastMessageTime: 'less than 1 day' },
    { id: '2', name: 'Lebron James', lastMessageTime: '2 weeks ago' },
    { id: '3', name: 'Alice Johnson', lastMessageTime: '3 hours ago' },
    { id: '4', name: 'Michael Scott', lastMessageTime: 'yesterday' },
    { id: '5', name: 'Dwight Schrute', lastMessageTime: '4 days ago' },
    { id: '6', name: 'Pam Beesly', lastMessageTime: '30 minutes ago' },
    { id: '7', name: 'Jim Halpert', lastMessageTime: 'just now' },
    { id: '8', name: 'Angela Martin', lastMessageTime: '1 week ago' },
    { id: '9', name: 'Kevin Malone', lastMessageTime: '2 days ago' },
    { id: '10', name: 'Oscar Martinez', lastMessageTime: '5 hours ago' },
    { id: '11', name: 'Kelly Kapoor', lastMessageTime: '10 minutes ago' },
    { id: '12', name: 'Ryan Howard', lastMessageTime: '6 days ago' },
  ]);

  const deleteConversation = (id) => {
    setConversations((prevConversations) =>
      prevConversations.filter((conversation) => conversation.id !== id)
    );
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversation}
      onPress={() => navigation.navigate("messaging", {
        navigation: navigation,
        receiverUsername: item.name
      })}
    >
      <View style={styles.conversationInfo}>
        <Icon name="chatbubble-outline" size={25} color="#FFF" style={styles.chatIcon} />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessageTime}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteConversation(item.id)}>
        <Icon name="trash-outline" size={25} color="#FF007F" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filterdConversations = conversations.filter(
    (conv) => conv.name.toLowerCase().includes(search.toLowerCase())
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
