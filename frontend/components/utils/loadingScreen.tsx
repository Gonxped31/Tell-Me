import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <ActivityIndicator size="large" color="#FFF" style={styles.loader} />
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
