import Alert from 'react-s-alert';
import { SuccessOption, ErrorOption } from '../constants/alertOptions';
import { store } from '../store';


const extractMobileOpts = () => {
  const state = store.getState();
  const isMobile = state.options.get('isMobile');
  return isMobile ? { position: "top" } : {};
};

export const successAlert = (text, opts) => {
  Alert.success(text, { ...SuccessOption, ...extractMobileOpts(), ...opts });
};

export const errorAlert = (text, opts) => {
  Alert.success(text, { ...ErrorOption, ...extractMobileOpts(), ...opts });
};
