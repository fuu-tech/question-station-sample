import { getFormValues, initialize } from 'redux-form';

import { cacheSearchValues } from '../actions/initialValues';
import { routes } from '../constants/routes';
import { generateUrl } from '../utils/generateUrl';
import { scrollTop } from '../utils/scroll';
import { store, history } from '../store';


const registFromValues = (formValues) => {
  const changeUrl = history.location.pathname === routes.search ? history.replace : history.push;
  const { queryType, limit, order, ...params } = formValues;
  changeUrl(generateUrl(routes.search, params));

  store.dispatch(cacheSearchValues(formValues));
  store.dispatch(initialize("searchForm", formValues));
};


export const search = (values = {}) => {
  const state = store.getState();

  const searchValuesCache = state.initialValues.get('searchValuesCache');
  const searchFormValues = getFormValues("searchForm")(state) || searchValuesCache;

  const nextFormValues = { ...searchFormValues, ...values };

  registFromValues(nextFormValues);

  scrollTop();
};
