import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ message = null, styles = {}, loaderSize = "large" }) => {
  return (
    <View style={StyleSheet.flatten([defaultStyles.container, styles.container])}>
      {message && <Text style={StyleSheet.flatten([defaultStyles.text, styles.text])}>
        {message}
      </Text>}
      <ActivityIndicator
        size={loaderSize}
        color="#FFF"
        style={StyleSheet.flatten([defaultStyles.loader, styles.loader])}
      />
    </View>
  );
};

export default LoadingScreen;

const defaultStyles = StyleSheet.create({
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
