// Central place for base URLs and all endpoint paths.
// Nothing else in the app should hardcode a URL string.

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : process.env.REACT_APP_API_BASE_URL || "https://api.radhe999.com/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/CheckCredential",
    REGISTER: "/auth/Register",
    REFRESH: "/auth/Refresh",
    LOGOUT: "/auth/Logout",
    ME: "/auth/Me",
  },
  USER: {
    PROFILE: "/user/Profile",
    UPDATE_PROFILE: "/user/UpdateProfile",
  },
  WALLET: {
    BALANCE: "/wallet/Balance",
    DEPOSIT: "/wallet/Deposit",
    WITHDRAW: "/wallet/Withdraw",
  },
  // add new domains here as the app grows — games, bets, transactions, etc.
};
