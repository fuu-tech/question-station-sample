import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import { createContent, setContent } from '../actions/contents';
import { cacheContentNewValues } from '../actions/initialValues';
import ContentNew from '../components/ContentNew';


const mapStateToProps = (state) => {
  const currentUser = state.users.get('currentUser');
  const isMobile = state.options.get('isMobile');
  const contentNewValuesCache = state.initialValues.get('contentNewValuesCache');
  const formValues = getFormValues("contentNewForm")(state) || {};

  return {
    currentUser,
    isMobile,
    contentNewValuesCache,
    formValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      createContent,
      setContent,
      cacheContentNewValues,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentNew);
