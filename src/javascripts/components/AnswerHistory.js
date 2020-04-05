import React from 'react';
import PropTypes from 'prop-types';
import HistorySharp from '@material-ui/icons/HistorySharp';

import Label from './atoms/Label';
import LinkButton from './atoms/LinkButton';
import TryButton from './atoms/TryButton';
import MarkDown from './atoms/MarkDown';
import CorrectAnswerRateBar from './atoms/CorrectAnswerRateBar';
import PageExplanation from './molecules/PageExplanation';
import ContentInfo from './organisms/ContentInfo';
import QuestionAnswerBase from './templates/QuestionAnswerBase';
import AnswerHistoryModel from '../models/AnswerHistory';
import { routes } from '../constants/routes';


const propTypes = {
  answerHistory: PropTypes.instanceOf(AnswerHistoryModel).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  actions: PropTypes.shape({
    setContent: PropTypes.func.isRequired,
    fetchAnswerHistory: PropTypes.func.isRequired,
  }).isRequired
};

class AnswerHistory extends React.Component {
  constructor(props) {
    super(props);
    const { actions: { fetchAnswerHistory }, match: { params } } = props;
    fetchAnswerHistory(Number(params.id));
    this.state = { index: 0 };
  }

  getAnswerHistoryContent = (idx = null) => {
    const index = typeof idx === "number" ? idx : this.state.index;
    return this.props.answerHistory.answerHistoryContents.get(index);
  }

  onClickContent = () => {
    this.props.actions.setContent(this.props.answerHistory.content);
  }

  generateNavActionStyle = (historyContentIndex) => {
    const answerHistoryContent = this.getAnswerHistoryContent(historyContentIndex);
    return answerHistoryContent.isCorrect ? { color: "limegreen" } : { color: "red" };
  }

  generateChoiceStyle = (choice, historyContentIndex) => {
    return choice.id !== this.getAnswerHistoryContent(historyContentIndex).questionContentChoiceId ? {
      backgroundColor: "white",
      color: "black",
    } : {};
  }

  render() {
    const { answerHistory } = this.props;
    const { answerHistoryContents, content } = answerHistory;
    const { index } = this.state;

    if (!answerHistory.id) return <div>解答履歴が存在しません</div>;

    const answerHistoryContent = this.getAnswerHistoryContent();
    const { questionContent } = answerHistoryContent;

    return (
      <div>
        <PageExplanation
          Icon={HistorySharp}
          title="解答履歴"
          explanation=""
        />
        <ContentInfo content={content} />
        <LinkButton onClick={this.onClickContent} to={routes.content(answerHistory.content.id)}>
          問題ページへ
        </LinkButton>
        <TryButton content={content}>
          もう一度
        </TryButton>

        <div>
          {`正答率: ${answerHistory.correctAnswerRate}%`}
          <CorrectAnswerRateBar correctAnswerRate={answerHistory.correctAnswerRate} />
        </div>
        <QuestionAnswerBase
          questionContent={questionContent}
          contentLen={answerHistoryContents.size}
          index={index}
          updateIndex={nextIndex => this.setState({ index: nextIndex })}
          onClickChoice={this.onClickChoice}
          generateNavActionStyle={this.generateNavActionStyle}
          generateChoiceStyle={this.generateChoiceStyle}
          displayAnswer
        >
          <div>
            <Label>
              {questionContent.explanation ? "解説" : "解説はありません"}
            </Label>
            <div className="markdown-padding-container">
              <MarkDown sentence={questionContent.explanation} />
            </div>
          </div>
        </QuestionAnswerBase>
      </div>
    );
  }
}

AnswerHistory.propTypes = propTypes;

export default AnswerHistory;
