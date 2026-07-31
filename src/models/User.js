/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} [email]
 * @property {string} [phone]
 * @property {number} [balance]
 */

/**
 * Normalizes whatever shape the backend sends into a consistent User object.
 * Update the right-hand-side keys once you confirm the real response fields.
 * @param {any} raw
 * @returns {User}
 */
export function toUser(raw = {}) {
  return {
    id: raw.UserID ?? raw.id ?? '',
    username: raw.UName ?? raw.username ?? '',
    email: raw.Email ?? raw.email ?? '',
    phone: raw.Phone ?? raw.phone ?? '',
    balance: raw.Balance ?? raw.balance ?? 0,
  };
}