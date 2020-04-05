import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateAnswerHistoryContent } from '../actions/histories';
import QuestionAnswer from '../components/QuestionAnswer';


const mapStateToProps = (state) => {
  const answerHistory = state.histories.get('answerHistory');

  return {
    answerHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      updateAnswerHistoryContent,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnswer);
