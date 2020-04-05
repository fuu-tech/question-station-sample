import { store } from '../store';
import { successAlert, errorAlert } from '../utils/alert';


export const requestApi = (action, successProcess = null, errorProcess = null) => {
  return (action instanceof Promise ? action : store.dispatch(action)).then((res) => {
    if (res.errors) {
      if (errorProcess) errorProcess(res, errorAlert);
      else {
        const errorMessage = typeof res.errors === 'string' ? res.errors : res.errors.join();
        errorAlert(errorMessage);
      }
    } else if (successProcess) {
      successProcess(res, successAlert);
    }
  });
};
