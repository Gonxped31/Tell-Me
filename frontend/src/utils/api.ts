import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { User, UserShort } from '../models/user'
import { Score } from '@/src/models/scores';
import { Conversation } from '@/src/models/conversation';
import { Message } from '@/src/models/message';
import { postData, fetchData, authTokens, putData, deleteData } from './dbfunctions';

export const UserAPI = {

    updateUser: async function (email: string, data, setLoading = null, cancel = null) {
        const result = await putData(`/update_user/${email}`, data, setLoading);
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
        const result = await postData(`/send_verification_code/${email}`, email, setLoading);
        return result;
    },

    validateVerificationCode: async function (data, setLoading = null, cancel = null) {
        const result = await postData(`/password_reset/verify/${data.email}/${data.code}`, data, setLoading);
        return result;
    }

}

export const ConversationAPI = {
    getConversations: async function (username: string, setLoading = null, cancel = false) {
        const result = await fetchData(`/get_conversations/${username}`, setLoading);
        return result.map((convInfo) => new Conversation(convInfo));
    },

    getConversation: async function (username_1: string, username_2: string, setLoading = null, cancel = false) {
        const result = await fetchData(`/get_conversation/${username_1}/${username_2}`, setLoading);
        return new Conversation(result);
    },

    createNewConversation: async function (data, setLoading = null, cancel = false) {
        const result = await postData(`/add_conversation`, data, setLoading);
        return result;
    },

    updateConversation: async function (conversation_id: string, data, setLoading = null, cancel = false) {
        const result = await putData(`/update_conversation/${conversation_id}`, data, setLoading);
        return result;
    },

    deleteConversation: async function (conv_id:string, setLoading = false, cancel = null) {
        const result = await deleteData(`/delete_conversation/${conv_id}`, setLoading);
        return result;
    }
}

export const MessageAPI = {
    getMessages: async function (conv_id:string, setLoading = null, cancel = false) {
        const result = await fetchData(`/message/conversation/get_all_messages/${conv_id}`, setLoading);
        return result.map((messageInfos) => new Message(messageInfos));
    },

    addNewMessage: async function (data, setLoading = null, cancel = false) {
        const result = await postData(`/add_message`, data, setLoading);
        return result;
    },

    markMessagesAsRead: async function (conv_id: string, sender_username: string, setLoading = null, cancel = false ) {
        const data = {
            conversation_id: conv_id,
            sender_username: sender_username
        }
        const result = await putData(`/message/update/${conv_id}/${sender_username}`, data, setLoading);
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