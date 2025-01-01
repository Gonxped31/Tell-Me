import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { User, UserShort } from '../models/user'
import { Score } from '@/models/scores';
import { postData, fetchData, authTokens, putData } from './dbfunctions';

export const UserAPI = {

    updateUser: async function (email: string, data, setLoading = null, cancel = null) {
        const result = putData(`/update_user/${email}`, data, setLoading);
        return result;
    },

    /** Location */
    updateLocation: async function (data, setLoading = null, cancel = null) {
        const result = await postData(`/update_user_location`, data, setLoading);
        return result;
    },

    getNearbyUsers: async function (latitude: Float, longitude: Float, setLoading = null, cancel = false) {
        const result = await fetchData(`/get_nearby_users/${latitude}/${longitude}`, setLoading);
        return result.map((user) => new UserShort(user));
    },

    /** Score */
    getScores: async function (username: string, setLoading = null, cancel = null) {
        const result = await fetchData(`/get_scores/${username}`, setLoading);
        return result.map((score) => new Score(score));
    },

    addScore: async function (data, setLoading = null, cancel = null) {
        const result = await postData(`/add_score`, data, setLoading);
        return result
    },

    /** Code erification */
    sendVerificationCode: async function (email: string, setLoading = null, cancel = null) {
        const result: boolean = await postData(`/send_verification_code/${email}`, email, setLoading);
        return result;
    },

    validateVerificationCode: async function (data, setLoading = null, cancel = null) {
        const result: boolean = await postData(`/password_reset/verify/${data.email}/${data.code}`, data, setLoading);
        return result;
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