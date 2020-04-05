import React from 'react';
import PropTypes from 'prop-types';

import QuestionAnswerSubmitButton from './atoms/QuestionAnswerSubmitButton';
import QuestionAnswerBase from './templates/QuestionAnswerBase';
import AnswerHistory from '../models/AnswerHistory';
import { routes } from '../constants/routes';


const propTypes = {
  answerHistory: PropTypes.instanceOf(AnswerHistory).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    updateAnswerHistoryContent: PropTypes.func.isRequired,
  }).isRequired,
};

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    const { answerHistory, history, match: { params } } = props;
    if (!answerHistory.id || answerHistory.content.id !== Number(params.id)) {
      history.replace(routes.content(params.id));
    }

    const { answerHistoryContents } = answerHistory;
    const index = answerHistoryContents.findIndex(
      historyContent => !historyContent.questionContentChoiceId
    );
    this.state = {
      index: index >= 0 ? index : answerHistoryContents.size - 1,
    };
  }

  getAnswerHistoryContent = (idx = null) => {
    const index = typeof idx === "number" ? idx : this.state.index;
    return this.props.answerHistory.answerHistoryContents.get(index);
  }

  onClickChoice = (e) => {
    const { actions: { updateAnswerHistoryContent } } = this.props;
    const params = {
      questionContentId: this.getAnswerHistoryContent().questionContent.id,
      choiceId: Number(e.currentTarget.value),
    };

    updateAnswerHistoryContent(params);
  }

  generateNavActionStyle = (historyContentIndex) => {
    const answerHistoryContent = this.getAnswerHistoryContent(historyContentIndex);
    return answerHistoryContent.questionContentChoiceId ? { color: "limegreen" } : {};
  }

  generateChoiceStyle = (choice, historyContentIndex) => {
    return choice.id !== this.getAnswerHistoryContent(historyContentIndex).questionContentChoiceId ? {
      backgroundColor: "white",
      color: "black",
    } : {};
  }

  render() {
    const { index } = this.state;
    const { answerHistory } = this.props;
    if (!answerHistory.id) return <></>;

    const { answerHistoryContents } = answerHistory;
    const { questionContent } = answerHistoryContents.get(index);

    return (
      <QuestionAnswerBase
        questionContent={questionContent}
        contentLen={answerHistoryContents.size}
        index={index}
        updateIndex={nextIndex => this.setState({ index: nextIndex })}
        onClickChoice={this.onClickChoice}
        generateNavActionStyle={this.generateNavActionStyle}
        generateChoiceStyle={this.generateChoiceStyle}
      >
        <QuestionAnswerSubmitButton answerHistory={answerHistory} />
      </QuestionAnswerBase>
    );
  }
}

QuestionAnswer.propTypes = propTypes;
export default QuestionAnswer;
