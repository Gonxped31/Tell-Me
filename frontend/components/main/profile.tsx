import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../utils/navBar';

const Profile = () => {
  const [username, setUsername] = useState('gonxped31');
  const [email, setEmail] = useState('gonxped31@gmail.com');
  const [password, setPassword] = useState('********');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSave = () => {
    // Add save logic here
    if (!username || !email || !password) {
        if (password.trim() === "" || email.trim() === "" || username.trim() === ""){
            alert("All fields must contains something.");
        } else {
            alert("Fields cannot contain spaces only.")
        }
    } else {
        alert('Profile saved successfully!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My profile</Text>
      </View>

      {/* Username Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#FF007F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#FF007F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={!isPasswordVisible}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#FF007F"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#FF007F" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon name="save-outline" size={20} color="#FFF" />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <NavBar />

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  editIcon: {
    marginLeft: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00cc66',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});
