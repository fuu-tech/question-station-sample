export const createProfileEditParams = (values) => {
  return {
    ...values,
    tags: values.tags.uniq('value').compact('value'),
  };
};
