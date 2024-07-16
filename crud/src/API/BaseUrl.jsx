import axios from "axios"


export const ImageUrl = import.meta.env.VITE_BASE_URL_IMAGE
const BaseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL 

})


// Request interceptor to add token to headers
BaseUrl.interceptors.request.use(
  (config) => {
    const loginToken = localStorage.getItem("atk");
    if (loginToken) {
      config.headers["token"] = loginToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
BaseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        console.log("Token refreshed successfully:", newToken)
        localStorage.setItem('atk', newToken);
        axios.defaults.headers['token'] = newToken;
        originalRequest.headers['token'] = newToken; // Ensure this line updates the header for the retry
        return BaseUrl(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('rtk');
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}refresh-token`, {
      refreshToken: refreshToken,
    });
    // console.log("Token refresh response:", response.data);
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    // Handle refresh token failure, e.g., log out the user
    return null;
  }
};

export default BaseUrl;



export const LOGIN = "login";
export const SING_UP = "register";
export const PRODUCT = "product";
export const GET_ALL_PRODUCTS = "get-product";
export const GET_USER_LIST = "user-list";
export const IS_ACTIVE = "user-status";
export const ORDER = "submit-order";
