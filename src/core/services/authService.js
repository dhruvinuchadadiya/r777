import client, { setAccessToken } from "@/core/api/client";
import { ENDPOINTS } from "@/core/config/endpoints";
import { toUser } from "@/core/models/User";

const getClientAddress = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "";
  }
};

export const authService = {
  async login(username, password) {
    const payload = {
      UName: username,
      Pwd: password,
      IV4Key: "client|0",
      Address: await getClientAddress(),
      UserAgent: navigator.userAgent,
    };

    const { data } = await client.post(ENDPOINTS.AUTH.LOGIN, payload);

    if (!data?.ID) {
      throw new Error("Login failed");
    }

    const user = toUser(data, { username });

    if (user.sessionToken) {
      setAccessToken(user.sessionToken);
    }

    return user;
  },

  async signUp(formPayload) {
    const { data } = await client.post(ENDPOINTS.AUTH.REGISTER, formPayload);
    if (!data?.ID) {
      throw new Error("Registration failed");
    }
    const user = toUser(data, {
      username: formPayload.UName ?? formPayload.username,
    });
    if (user.sessionToken) {
      setAccessToken(user.sessionToken);
    }
    return user;
  },

  async logout() {
    // Endpoint unconfirmed — wrapped so a missing/failing endpoint doesn't block local logout
    await client.post(ENDPOINTS.AUTH.LOGOUT);
  },

  async fetchCurrentUser() {
    // Endpoint unconfirmed — only used if you later confirm a real "who am I" endpoint exists
    const { data } = await client.get(ENDPOINTS.AUTH.ME);
    return toUser(data);
  },
};
