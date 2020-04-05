import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnswerHistory from '../components/AnswerHistory';
import { fetchAnswerHistory } from '../actions/histories';
import { setContent } from '../actions/contents';


const mapStateToProps = (state) => {
  const answerHistory = state.histories.get('answerHistory');

  return {
    answerHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setContent,
      fetchAnswerHistory,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerHistory);
