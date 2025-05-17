import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/src/constants/variables';

// Create an axios instance with the base URL
const authenticatedRequest = axios.create({
  baseURL: API_BASE_URL + "/api",
});

// Add a request interceptor to include the Authorization header
authenticatedRequest.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors and refresh token
authenticatedRequest.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        console.log('Refreshing token...');
        const refreshToken = await AsyncStorage.getItem('refreshToken'); // Get refresh token
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Request a new access token using the refresh token
        const response = await axios.post(
          API_ENDPOINT + '/auth/refresh',
          { refreshToken: refreshToken }
        );

        const { access_token, refresh_token } = response.data;

        // Save the new tokens to AsyncStorage
        await AsyncStorage.setItem('accessToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        console.log('Retrying original request with new token...');
        return authenticatedRequest(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Clear tokens and redirect to login
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // Redirect user to login screen (adjust based on your navigation setup)
        console.log('Redirecting to login...');
        // Example: NavigationService.navigate('Login');
      }
    }

    return Promise.reject(error);
  }
);

export default authenticatedRequest;