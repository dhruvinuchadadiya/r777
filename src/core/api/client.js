import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "@/core/config/endpoints";

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};
export const getAccessToken = () => accessToken;

client.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      original.url !== ENDPOINTS.AUTH.REFRESH
    ) {
      original._retry = true;
      try {
        refreshPromise = refreshPromise || client.post(ENDPOINTS.AUTH.REFRESH);
        const { data } = await refreshPromise;
        refreshPromise = null;
        setAccessToken(data.accessToken ?? data.Token);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return client(original);
      } catch (refreshError) {
        setAccessToken(null);
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
