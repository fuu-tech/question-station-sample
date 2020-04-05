import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues, change } from 'redux-form';

import { cacheSearchValues } from '../actions/initialValues';
import { initialSearchValues } from '../constants/initialValues';
import Search from '../components/Search';


const mapStateToProps = (state) => {
  const totalPages = state.search.get('totalPages');
  const totalCount = state.search.get('totalCount');
  const workbooks = state.search.get('workbooks');
  const contents = state.search.get('contents');
  const users = state.search.get('users');
  const searchValuesCache = state.initialValues.get('searchValuesCache');
  const formValues = getFormValues("searchForm")(state) || initialSearchValues;

  return {
    totalPages,
    totalCount,
    workbooks,
    contents,
    users,
    searchValuesCache,
    formValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      cacheSearchValues,
      change,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
