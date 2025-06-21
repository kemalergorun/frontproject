/**
 * Calculate order number according to page and size in a paginated list
 * @param {number} page
 * @param {number} size
 * @param {number} index
 * @returns {number}
 */

export const calculateOrderNumber = (page = 1, size = 500, index) => {
  return (page - 1) * size + index + 1;
};
