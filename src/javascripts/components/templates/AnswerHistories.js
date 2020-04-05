import React from 'react';
import PropTypes from 'prop-types';
import { List as ListModel } from 'immutable';

import List from '../atoms/List';
import LinkListItem from '../atoms/LinkListItem';
import CorrectAnswerRateBar from '../atoms/CorrectAnswerRateBar';
import { answerHistoryTypes } from '../../constants/answerHistoryTypes';
import { routes } from '../../constants/routes';


const propTypes = {
  answerHistories: PropTypes.instanceOf(ListModel).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    setAnswerHistory: PropTypes.func.isRequired,
  }).isRequired,
};

class AnswerHistories extends React.Component {
  renderCard = (answerHistory) => {
    const { actions: { setAnswerHistory } } = this.props;
    const to = routes.answerHistoryShow(answerHistory.id);
    const onClick = () => setAnswerHistory(answerHistory);
    return (
      <LinkListItem
        to={to}
        onClick={onClick}
        key={answerHistory.id}
        disableTextDecoration
      >
        <div>
          {answerHistory.content.title}
        </div>
        <div className="answer-history-card-bottom-row">
          {answerHistory.answerHistoryType === answerHistoryTypes.weak && <div>苦手</div>}
          <div>
            {answerHistory.updatedAt}
          </div>
        </div>
        <CorrectAnswerRateBar correctAnswerRate={answerHistory.correctAnswerRate} />
      </LinkListItem>
    );
  }

  render() {
    const { answerHistories } = this.props;

    return (
      <div>
        {answerHistories.size ? (
          <List list={answerHistories} renderCard={this.renderCard} />
        ) : "解答履歴が存在しません"}
      </div>
    );
  }
}

AnswerHistories.propTypes = propTypes;
export default AnswerHistories;
