import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignOutButton = ({ onPress, style, textStyle, iconSize = 24, iconColor = '#FFF' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // Combine default and custom styles
      onPress={onPress} // Sign-out logic provided by the parent
    >
      <Icon name="log-out-outline" size={iconSize} color={iconColor} style={styles.icon} />
      <Text style={[styles.text, textStyle]}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF007F', // Default button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignOutButton;
