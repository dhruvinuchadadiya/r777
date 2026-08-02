import client, { setAccessToken } from "../api/client";
import { ENDPOINTS } from "../config/endpoints";
import { toUser } from "../models/User";

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

    // No explicit success flag in this response — presence of ID means success.
    if (!data?.ID) {
      throw new Error("Login failed");
    }

    const user = toUser(data);

    // Best-effort: treat Captcha as the session token until confirmed with backend.
    if (user.sessionToken) {
      setAccessToken(user.sessionToken);
    }

    return user;
  },

  // signUp/logout/fetchCurrentUser unchanged for now — still unconfirmed shapes
};
