import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../utils/loadingScreen';
import { useAuth } from '@/src/hooks/useAuth';
import { validateInputs } from '@/src/constants/functions';
import { UserAPI } from '@/src/utils/api';
import Toast from 'react-native-toast-message';
import { collectionGroup, getDocs, updateDoc, doc } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { findAverageScore } from '@/src/constants/functions';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('********');
  const [isLoading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { actualUser, logout } = useAuth();
  const [ averageScore, setAverageScore ] = useState(0);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const updateUserInFirestore = async (oldEmail, newEmail, newName, conversations) => {
    try {
      console.log('conversations=', conversations);
      // Step 1: Use `collectionGroup` to fetch all documents in Firestore where the nested field matches\
      for (const conversation of conversations) {
        console.log('conversation=', conversation);
        const messagesSnapshot = await getDocs(collectionGroup(database, conversation));
        console.log('messagesSnapshot=', messagesSnapshot.docs);

        if (messagesSnapshot.docs.length === 0) {
          console.log("No relevant documents found in Firestore.");
          return;
        }
        // Step 2: Iterate through the documents
        for (const messageDoc of messagesSnapshot.docs) {
          const messageData = messageDoc.data();
          // Check if `user._id` matches the old email
          if (messageData.user?._id === oldEmail) {
            console.log(`Updating document ID: ${messageDoc.id} in collection`);

            // Step 3: Update the document with new data
            await updateDoc(doc(database, messageDoc.ref.path), {
              "user._id": newEmail,
              "user.name": newName,
            });
          }
        }
      }

      console.log("All relevant documents updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating Firestore:", error);
    }
  };


  const handleSave = () => { 
    if (validateInputs(username, email, password)) {
      const data = password.length === 0 ? {
        username: username,
        email: email
      } :
      {
        username: username,
        email: email,
        password: password
      };

      console.log('email' ,actualUser.email);

      UserAPI.updateUser(actualUser.email, data, setLoading)
      .then((response) => {
        Toast.show({
          type: 'success',
          text1: 'Logged out.'
        });
        if ('username' in data || 'email' in data) {
          updateUserInFirestore(actualUser.email, email, username, response.updated_conversations);
        }
        logout();
      })
      .catch((error) => {
        console.error('An error occured',error);
      });
    }
  };

  useEffect(() => {
    setUsername(actualUser.username);
    setEmail(actualUser.email);

    UserAPI.getScores(actualUser.username)
        .then((data) => {
          console.log(data);
          if (data) {
            if (data.length > 0){
              setAverageScore(findAverageScore(data));
            } else {
              setAverageScore(0.0);
            }
          }
        })
        .catch((error) => {
          console.error('An error occured', error)
          Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: 'An error occured while fetching user infos'
          })
        })
  }, [])

  return (
    isLoading ? <LoadingScreen message={'signing out...'} /> :
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>My profile </Text>
          <Text style={styles.score}>{averageScore}</Text>
          <Icon style={styles.star} name="star" size={25} color="#FFD700" />
        </View>
        <Text style={styles.subtitle}>You will be logged out after saving.</Text>
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
        <Text style={styles.label}>New Password</Text>
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

      {/* <NavBar /> */}

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
  star: {
    marginLeft: 0,
  },
  score: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 2
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
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
