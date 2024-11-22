import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotFound from '../utils/notFound';
import NavBar from '../utils/navBar';

const MainView = () => {
  const [search, setSearch] = useState('');
  const users = [
    { id: '1', name: 'John Doh', distance: 2 },
    { id: '2', name: 'Sarah Liu', distance: 5 },
    { id: '3', name: 'Jack Lee', distance: 85 },
    { id: '4', name: 'Mary Tong', distance: 1 },
    { id: '5', name: 'Dwight Schrute', distance: 100 },
    { id: '6', name: 'Pam Beesly', distance: 56 },
    { id: '7', name: 'Jim Halpert', distance: 284 },
    { id: '8', name: 'Angela Martin', distance: 321 },
    { id: '9', name: 'Kevin Malone', distance: 147 },
    { id: '10', name: 'Oscar Martinez', distance: 58 },
    { id: '11', name: 'Kelly Kapoor', distance: 32 },
    { id: '12', name: 'Ryan Howard', distance: 0 },
  ];

  const userCard = ({ item }) => (
    <View style={styles.userCard}>
      <Icon name="person-circle-outline" size={50} color="#FFF" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDistance}>Distance: {"" + item.distance} m</Text>
      </View>
    </View>
);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TELL ME</Text>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
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
      </View>

      {/* Nearby Users */}
      <Text style={styles.subtitle}>Nearby users</Text>
      { filteredUsers.length != 0 ? <FlatList
        data={filteredUsers}
        renderItem={userCard}
        keyExtractor={(item) => item.id}
      /> : <NotFound message={"No user found..."} /> }

      <NavBar />
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    width: '100%',
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
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '80%'
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  searchWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10
  },
  userList: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDistance: {
    color: '#AAA',
    fontSize: 14,
  }
});
