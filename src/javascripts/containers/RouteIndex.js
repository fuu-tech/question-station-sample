import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RouteIndex from '../components/RouteIndex';


const mapStateToProps = (state) => {
  const currentUser = state.users.get('currentUser');
  const user = state.users.get('user');

  return {
    currentUser,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteIndex);
