/**
 * @typedef {Object} ApiResult
 * @property {boolean} success
 * @property {any} data
 * @property {string} [message]
 */

/**
 * Normalizes API responses into a consistent shape.
 * Adjust field names (Success/Status/Msg etc.) once you confirm backend conventions.
 * @param {any} raw
 * @returns {ApiResult}
 */
export function toApiResult(raw = {}) {
  return {
    success: raw.Success ?? raw.success ?? true,
    data: raw.Data ?? raw.data ?? raw,
    message: raw.Message ?? raw.message ?? "",
  };
}
