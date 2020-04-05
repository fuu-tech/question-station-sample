export const extractNestedValues = (obj) => {
  return Object.values(obj).map((value) => {
    return value && typeof value === 'object' ? extractNestedValues(value) : value;
  }).flat();
};
