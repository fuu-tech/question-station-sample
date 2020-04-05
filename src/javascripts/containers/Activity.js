import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activity from '../components/Activity';
import { setUser } from '../actions/users';
import { setContent } from '../actions/contents';


const mapStateToProps = (state) => {
  const currentUser = state.users.get('currentUser');
  const newsList = state.news.get('newsList');
  const newContents = state.contents.get('newContents');
  const participatedContents = state.histories.get('participatedContents');

  return {
    currentUser,
    newsList,
    newContents,
    participatedContents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setContent,
      setUser,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
