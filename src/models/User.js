export function toUser(raw = {}, extra = {}) {
  return {
    id: raw.ID ?? "",
    profileId: raw.PID ?? null,
    level: raw.Level ?? 0,
    canBet: raw.Betting ?? false,
    exposureLimit: raw.ExpoLimit ?? 0,
    lastLogin: raw.LastLogin ?? null,
    sessionToken: raw.Captcha ?? null, // unconfirmed: appears to be session/auth token — never persist this
    balance: raw.Balance ?? 0, // not present in current CheckCredential response — needs a separate endpoint
    username: extra.username ?? "", // backend doesn't echo this back, so we carry it from the login form
    // Deliberately NOT mapping TPwd — never store the plaintext password anywhere client-side
  };
}
