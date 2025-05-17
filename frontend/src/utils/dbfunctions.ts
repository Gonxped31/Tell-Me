import { API_BASE_URL } from "@/src/constants/variables";
import authenticatedRequest from "@/src/helpers/authenticatedRequest";

const testing = false;

const buildUrl = (url) => {
    // const apiUrl = testing ? 
    // `http://10.0.2.2:8000${url}` :
    // // process.env.VITE_API_ENDPOINT + "/api" + url;
    // 'http://10.0.2.2:8000' + "/api" + url;
    // console.log(apiUrl);
    // return apiUrl
    return API_BASE_URL + '/api' + url
}

function encodeFormData(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

export async function authTokens(url, data, setLoading = null) {
    if (setLoading) {
        setLoading(true);
    }
    const formBody = encodeFormData(data)
    try {
        const response = await fetch(buildUrl(url), {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}

export async function fetchData(url, setLoading = null) {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await authenticatedRequest.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}

export async function postData(url, data, setLoading = null) {
    if (setLoading) {
        setLoading(true);
    }

    try{
        const response = await authenticatedRequest.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}

export async function deleteData(url, setLoading = null) {
    if (setLoading) {
        setLoading(true);
    }

    try{
        const response = await authenticatedRequest.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}

export async function putData(url, data, setLoading = null) {
    if (setLoading) {
        setLoading(true);
    }
    
    try{
        const response = await authenticatedRequest.put(url, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}