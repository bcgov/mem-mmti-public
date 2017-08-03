
/**
 * Creates a function that returns the value at `key` of a given object.
 */
const property = (key: string): Function => {
  return function (object) {
    return object == null ? undefined : object[key];
  };
};

/**
 * Creates a duplicate-free version of an array in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 *
 * @param array The array to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns  Returns the new duplicate free array.
 */
export const uniqueBy = (array: any[], iteratee: string | Function) => {
  const getValue = typeof iteratee === 'function' ? iteratee : property(iteratee);
  const seen = {};

  return array.filter((element, index, arr) => {
    const value = getValue(element);

    if (!(value in seen)) {
      seen[value] = 1;  // flag as seen
      return true;
    }

    return false;
  });
};
