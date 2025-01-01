import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { User, UserShort } from '../models/user'
import { postData, fetchData, authTokens } from './dbfunctions';

export const UserAPI = {

    updateLocation: async function (data, setLoading = null, cancel = null) {
        const result = await postData(`/update_user_location`, data, setLoading);
        return result;
    },

    getNearbyUsers: async function (latitude: Float, longitude: Float, setLoading = null, cancel = false) {
        const data = {
            latitude: latitude,
            longitude: longitude
        }
        const result = await fetchData(`/get_nearby_users/${latitude}/${longitude}`, setLoading);
        return result.map((user) => new UserShort(user));
    }
}

export const authAPI = {
    /**
    * Saves a new user.
    *
    * @param {object} data - The user data to be saved.
    * @param {Function} setLoading - Optional. A function to set loading state.
    * @param {boolean} cancel - Optional. Flag to cancel the request.
    * @return {Promise<object>} The result of the save operation.
    */
    signup: async function (data, setLoading = null, cancel = false) {

        const result = await postData(`/add_user`, data, setLoading);
        return new User(result);
    },

    login: async function (data, setLoading = null, cancel = false) {
        const result = await authTokens(`/auth/login`, data, setLoading);
        return result;
    }
}