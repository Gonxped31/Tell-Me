import { API_ENDPOINT } from "@/constants/variables";

const testing = false;

const buildUrl = (url) => {
    // const apiUrl = testing ? 
    // `http://10.0.2.2:8000${url}` :
    // // process.env.VITE_API_ENDPOINT + "/api" + url;
    // 'http://10.0.2.2:8000' + "/api" + url;
    // console.log(apiUrl);
    // return apiUrl
    return API_ENDPOINT + '/api' + url
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
        console.log(buildUrl(url));
        const response = await fetch(buildUrl(url));

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error to the caller
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

    try {
        const response = await fetch(buildUrl(url), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Propagate the error to the caller
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

    try {
        const response = await fetch(buildUrl(url), {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Propagate the error to the caller
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

    try {
        const response = await fetch(buildUrl(url), {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Propagate the error to the caller
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}