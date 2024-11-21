import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserCard from '../utils/userCard';

const MainView = () => {
  const [search, setSearch] = useState('');
  const users = [
    { id: '1', name: 'John Doh', distance: '2 m' },
    { id: '2', name: 'Sarah Liu', distance: '5 m' },
    { id: '3', name: 'Jack Lee', distance: '85 m' },
    { id: '4', name: 'Mary Tong', distance: '1 m' },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TELL ME</Text>

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

      {/* Nearby Users */}
      <Text style={styles.subtitle}>Nearby users</Text>
      <FlatList
        data={filteredUsers}
        renderItem={UserCard}
        keyExtractor={(item) => item.id}
        style={styles.userList}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={25} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={25} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="chatbubble-outline" size={25} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings-outline" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userList: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  navItem: {
    alignItems: 'center',
  },
});
