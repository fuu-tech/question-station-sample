import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateDisplayedContent } from '../actions/contents';
import Content from '../components/Content';


const mapStateToProps = (state) => {
  const isMobile = state.options.get('isMobile');
  const currentUser = state.users.get('currentUser');
  const content = state.contents.get('content');

  return {
    isMobile,
    currentUser,
    content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      updateDisplayedContent,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
