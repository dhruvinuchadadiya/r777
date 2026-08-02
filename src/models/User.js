export function toUser(raw = {}) {
  return {
    id: raw.ID ?? "",
    profileId: raw.PID ?? null,
    level: raw.Level ?? 0,
    canBet: raw.Betting ?? false,
    exposureLimit: raw.ExpoLimit ?? 0,
    lastLogin: raw.LastLogin ?? null,
    sessionToken: raw.Captcha ?? null, // unconfirmed: appears to be a session/auth token
  };
}
