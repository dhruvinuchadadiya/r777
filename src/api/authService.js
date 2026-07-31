import client, { setAccessToken } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import { toUser } from '../models/User';
import { toApiResult } from '../models/ApiResponse';

const getClientAddress = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch {
    return '';
  }
};

export const authService = {
  async login(username, password) {
    const payload = {
      UName: username,
      Pwd: password,
      IV4Key: 'client|0', // confirm if this needs to vary per device/session
      Address: await getClientAddress(),
      UserAgent: navigator.userAgent,
    };

    const { data } = await client.post(ENDPOINTS.AUTH.LOGIN, payload);
    const result = toApiResult(data);

    if (!result.success) {
      throw new Error(result.message || 'Login failed');
    }

    if (result.data?.Token || result.data?.accessToken) {
      setAccessToken(result.data.Token ?? result.data.accessToken);
    }

    return toUser(result.data);
  },

  async signUp(formPayload) {
    const { data } = await client.post(ENDPOINTS.AUTH.REGISTER, formPayload);
    const result = toApiResult(data);
    if (!result.success) throw new Error(result.message || 'Registration failed');
    if (result.data?.Token) setAccessToken(result.data.Token);
    return toUser(result.data);
  },

  async logout() {
    await client.post(ENDPOINTS.AUTH.LOGOUT);
    setAccessToken(null);
  },

  async fetchCurrentUser() {
    const { data } = await client.get(ENDPOINTS.AUTH.ME);
    return toUser(toApiResult(data).data);
  },
};