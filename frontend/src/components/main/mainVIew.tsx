import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../utils/navBar';
import LoadingScreen from '../utils/loadingScreen';
import { UserAPI } from '@/src/utils/api';
import useLocation from '@/src/hooks/useLocation';
import { useAuth } from '@/src/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';


const MainView = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFindingUser, setIsFindingUser] = useState(true);
  const [users, setUsers] = useState([]);
  const { location, locationStatus, error } = useLocation({
    timeInterval: 10000, // Update every 10 seconds
    distanceInterval: 5,  // Update every 5 meters
  });
  const { logout, actualUser } = useAuth();
  
  useFocusEffect(
    useCallback(() => {
      if (location.latitude === null || location.longitude === null || actualUser == null) {
        return;
      }
  
      const input = {
        username: actualUser.username,
        latitude: `${location.latitude}`,
        longitude: `${location.longitude}`
      }
  
      UserAPI.updateLocation(input)
      .then((data) => {
        UserAPI.getNearbyUsers(input.latitude, input.longitude, setIsFindingUser).then(
          (data) =>{
            const validData = data.filter((fetcheduser) => fetcheduser.username != actualUser.username)
            setUsers(validData);
          }
        ).catch((error) => {
          console.error('Error getting users:', error);
        });
      })
      .catch((error) => {
        console.error('Error updating user location', error)
      });
  
    }, [location, actualUser])
  )
  
  const userCard = ({ item }) => (
    <TouchableOpacity style={styles.userCard} 
    onPress={() => navigation.navigate("rateUser", {
      navigation: navigation,
      infos: item
    })}>
      <Icon name="person-circle-outline" size={50} color="#FFF" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.userDistance}>Distance: {"" + item.distance_m} m</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredUsers = users.length > 0 ? users.filter((user) =>
    actualUser.username.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const handleLogOut = () => {
    setIsLoading(true);
    logout().then((data) => {
      UserAPI.deleteUserLocation(actualUser.username)
      .catch((error) => {
        console.error("Error deleteing user's location", error)
      });
      Toast.show({
        type: 'info',
        text1: 'Logged out!'
      })
    }).catch((error) => {
      console.error('Error during log out', error)
      Toast.show({
        type: 'error',
        text1: 'Error during log out.'
      })
    })
  };

  return (
    !isLoading ? <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TELL ME</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleLogOut}>
          <Icon name="log-out-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

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
      { !isFindingUser  ? <FlatList
        data={filteredUsers}
        renderItem={userCard}
        keyExtractor={(item) => item.username}
        contentContainerStyle={{ paddingBottom: 55 }}
      /> : <LoadingScreen message={"Loading users..."} styles={loadingStyle} loaderSize='60' />}

      <NavBar navigation={navigation} />
    </View> : <LoadingScreen message={"Singing out..."} />
  );
};

export default MainView;

const loadingStyle = {
  text: {
    marginBottom: 50,
    marginTop: -200,
  },
  loader: {
    marginTop: -10,
    with: 50,
    
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 20,
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
  signOutButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
