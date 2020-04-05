import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AnswerHistories from '../../components/templates/AnswerHistories';
import { setAnswerHistory } from '../../actions/histories';


const mapStateToProps = (state) => {
  const answerHistories = state.histories.get('answerHistories');

  return {
    answerHistories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setAnswerHistory,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AnswerHistories));
