import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserCard = ({ item }) => (
    <View style={styles.userCard}>
      <Icon name="person-circle-outline" size={40} color="#FFF" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDistance}>Distance: {"" + item.distance} m</Text>
      </View>
    </View>
);

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDistance: {
    color: '#AAA',
    fontSize: 14,
  }
});