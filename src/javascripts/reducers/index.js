import { reducer as formReducer } from 'redux-form';
import options from './options';
import users from './users';
import contents from './contents';
import histories from './histories';
import search from './search';
import news from './news';
import initialValues from './initialValues';

export default {
  options,
  users,
  contents,
  histories,
  search,
  news,
  initialValues,
  form: formReducer,
};
