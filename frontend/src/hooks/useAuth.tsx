import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../utils/api'; // Import your API methods
import authenticatedRequest from '../helpers/authenticatedRequest'
import Toast from 'react-native-toast-message';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object
  const [access_token, setAccessToken] = useState(null); // Access token
  const [refresh_token, setRefreshToken] = useState(null); // Access token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const [loading, setLoading] = useState(true); // To handle async loading during app initialization

  // Keys for AsyncStorage
  const ACCESS_TOKEN_KEY = 'accessToken';
  const REFRESH_TOKEN_KEY = 'refreshToken'
  const USER_KEY = 'authUser';

  // Function to load stored authentication state on app initialization
  const loadAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const storedRefreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthState(); // Load auth state when app starts
  }, []);

  // Login Function
  const login = async (username: string, password: string, setLoading = null) => {
    try {
      const data = await authAPI.login({ username: username, password: password }, setLoading);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setIsAuthenticated(true);
      setUser(await getCurrentUser());
      return true;
    } catch (error) {
      // console.error('Login failed:', error);
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authenticatedRequest.post("/auth/verify_token");
      return response.data;
    } catch (error) {
      console.error(error.message)
      throw error
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setIsAuthenticated(false);
      console.log('Logged out!');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = { 
    actualUser: user,
    isAuthenticated: isAuthenticated,
    loading: loading,
    access_token: access_token,
    login: login,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
