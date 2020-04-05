import { createBrowserHistory } from 'history';

import devConfigureStore from './configureStore.dev';

export const store = devConfigureStore();
export const history = createBrowserHistory();
