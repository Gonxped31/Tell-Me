import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../utils/navBar';

const Settings = ({ navigation }) => {
  const [anonymousMessages, setAnonymousMessages] = useState(false);
  const [deleteMessages, setDeleteMessages] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Anonymous Messages Setting */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Anonymous messages</Text>
          <Switch
            value={anonymousMessages}
            onValueChange={setAnonymousMessages}
            trackColor={{ false: '#555', true: '#FF007F' }}
            thumbColor={anonymousMessages ? '#FFF' : '#FFF'}
          />
        </View>

        {/* Delete Messages Setting */}
        {/* <View style={styles.settingContainer}>
          <Text style={styles.settingText}>{"Delete messages\nafter 2 days"}</Text>
          <Switch
            value={deleteMessages}
            onValueChange={setDeleteMessages}
            trackColor={{ false: '#555', true: '#FF007F' }}
            thumbColor={deleteMessages ? '#FFF' : '#FFF'}
          />
        </View> */}
      </ScrollView>

      {/* <NavBar /> */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  settingText: {
    color: '#FFF',
    fontSize: 18,
    paddingLeft: 10

  }
});
