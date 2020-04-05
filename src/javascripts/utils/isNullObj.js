export const isNullObj = (obj) => {
  const rs = !Object.values(obj).some((value) => {
    if (value && typeof value === "object") return !isNullObj(value);
    return value;
  });
  return rs;
};
