import { useSelector } from 'react-redux';


export const useFormValues = (formName) => {
  return useSelector((state) => {
    const form = state.form[formName];
    if (!form || !form.values) return {};

    return form.values;
  });
};

export const useFormValue = (formName, fieldName, defaultValue = null) => {
  return useSelector((state) => {
    const form = state.form[formName];
    if (!form || !form.values) return defaultValue;

    return form.values[fieldName];
  });
};
