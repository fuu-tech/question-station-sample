import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setUser } from '../actions/users';
import UserPage from '../components/UserPage';


const mapStateToProps = (state) => {
  const currentUser = state.users.get('currentUser');
  const user = state.users.get('user');
  const isMobile = state.options.get('isMobile');

  return {
    currentUser,
    user,
    isCurrentUser: currentUser.id !== null && currentUser.id === user.id,
    isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setUser,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
