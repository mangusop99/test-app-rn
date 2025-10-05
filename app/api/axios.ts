import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://api.yourbackend.com";
const DUMMY_API_URL = "https://dummyjson.com";

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = axios.create({
  baseURL: DUMMY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

productApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
