export function pick(keys, source) {
  const result = {};

  for (let key of keys) {
    result[key] = source[key];
  }

  return result;
}