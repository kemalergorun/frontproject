const parseJwt = (token) => {
  // token.split('.')[1] => token consists of three parts separated by dots. The second part is the payload.
  // atob() => decodes a string of data which has been encoded using base-64 encoding.
  return JSON.parse(atob(token.split(".")[1]));
};

/**
 * Check if the token is valid by comparing the expiration time of the token with the current time
 *
 * @param {string} token - The token to check
 * @returns {boolean} - If the token is valid or not
 */
export const isTokenValid = (token) => {
  if (!token) return false;

  const jwtExpireTimeStamp = parseJwt(token).exp;

  const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);

  if (jwtExpireDateTime < new Date()) return false;

  return true;
};
