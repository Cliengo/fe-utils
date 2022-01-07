/**
 * Takes a value and checks if it's any kind of empty
 *
 * @param content - Value which will send to clipboard.
 * @returns (boolean) - Response of the operation.
 */
const isEmpty = (value) => value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;