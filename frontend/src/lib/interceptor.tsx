import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/globalVariables";

const BASEURL = `${BACKEND_URL}`;

const AxiosInstance = axios.create({
  baseURL: BASEURL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("auth"); // Get access token from the local storage

    if (accessToken) {
      // if access token is present, add it to the bearer-token
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    // Error-handling
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if error response is present and error status is 401 or 403
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error("Response error :: ", error.response);

      // fetch new access token
      try {
        const refresh_token_url = "add-your-refresh-token-endpoint";
        const response = await axios.post(refresh_token_url, {
          refresh: localStorage.getItem("refresh"), // Get refresh token from local storage
        });

        const newAccesToken = response.data.access;

        localStorage.setItem("access", newAccesToken); // Update the access token in local storage

        // Re-try the original request
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccesToken}`;
        return await axios(originalRequest);
      } catch (refreshError) {
        // incase of failed refresh, re-direct to login page
        const navigate = useNavigate(); // If you have React-router-dom
        navigate("/");

        // or window.location.href = "/login" if you do not use react-router-dom

        return await Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export async function getAlerts(){
    const response = await AxiosInstance.get(`${BACKEND_URL}Alerts`);
    return response.data;
}