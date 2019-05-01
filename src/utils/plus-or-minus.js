/**
 * Simply adds a + to positive numbers,
 * - to negative ones,
 * and space to zero.
 */
export default (number: number): string => {
  if (number > 0) {
    return `+${number}`;
  }
  if (number === 0) {
    return ` ${number}`;
  }
  return `${number}`;
};
