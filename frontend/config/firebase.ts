import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra.apiKey,
  authDomain: Constants.expoConfig?.extra.authDomain,
  projectId: Constants.expoConfig?.extra.projectId,
  storageBucket: Constants.expoConfig?.extra.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra.messagingSenderId,
  appId: Constants.expoConfig?.extra.appId,
  databaseURL: Constants.expoConfig?.extra.databaseURL
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const auth = getAuth();
export const database = getFirestore();