/**
 * Code generation utilities for PYNCH waitlist discount & referral system.
 *
 * generateCouponCode(prefix)  → e.g. "PYNCH10-XK92J"
 * generateReferralCode(name)  → e.g. "PYNCHREF-TASHU7"
 */

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omit O/0, I/1 to avoid confusion

/**
 * Returns a random alphanumeric string of the given length, using CHARSET.
 */
function randomStr(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return result;
}

/**
 * Generate a discount coupon code with a given prefix.
 * @param {string} prefix - e.g. "PYNCH10" for 10% off, "PYNCH5" for 5% off
 * @returns {string} - e.g. "PYNCH10-XK92J"
 */
export function generateCouponCode(prefix) {
  return `${prefix}-${randomStr(5)}`;
}

/**
 * Generate a referral code tied loosely to a user's name.
 * Takes the first 5 letters of the name (uppercased) + 3 random chars.
 * @param {string} name - The user's name
 * @returns {string} - e.g. "PYNCHREF-TASHU7B2"
 */
export function generateReferralCode(name) {
  // Sanitize: keep only letters, uppercase, take first 5
  const namePart = (name || 'USER')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 5)
    .padEnd(5, 'X');

  return `PYNCHREF-${namePart}${randomStr(3)}`;
}
