import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import Button from '../atoms/Button';
import MarkDown from '../atoms/MarkDown';
import RightNoteBlock from '../molecules/RightNoteBlock';
import { elemScroll } from '../../utils/scroll';


const defaultChoiceStyle = {
  backgroundColor: "white",
  color: "black",
};

const propTypes = {
  questionContent: PropTypes.shape({
    sentence: PropTypes.string,
    explanation: PropTypes.string,
    answerHistoryContentCounter: PropTypes.number,
    correctAnswerHistoryContentCounter: PropTypes.number,
    choices: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.instanceOf(List),
    ]).isRequired,
  }).isRequired,
  contentLen: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired,
  onClickChoice: PropTypes.func,
  generateChoiceStyle: PropTypes.func,
  generateNavActionStyle: PropTypes.func,
  children: PropTypes.node,
  displayAnswer: PropTypes.bool,
};

class QuestionAnswerBase extends React.Component {
  constructor(props) {
    super(props);
    this.navButtonContainerRef = createRef();
    this.navButtonRef = createRef();
    this.state = { isMoving: false };
  }

  onClickNext = () => {
    this.move(this.props.index + 1);
  }

  onClickBefore = () => {
    this.move(this.props.index - 1);
  }

  move = (index) => {
    const { contentLen, updateIndex } = this.props;
    if (index >= 0 && index < contentLen) {
      updateIndex(index);
    }
    this.setState({ isMoving: false });

    setTimeout(() => {
      elemScroll(this.navButtonContainerRef.current, this.navButtonRef.current);
    }, 50);
  }

  onClickChoice = (e) => {
    if (this.state.isMoving) return;

    this.props.onClickChoice(e);

    this.setState({ isMoving: true });
    setTimeout(this.onClickNext, 200);
  }

  render() {
    const {
      questionContent,
      contentLen,
      index,
      generateNavActionStyle,
      generateChoiceStyle,
      children,
      displayAnswer,
    } = this.props;

    return (
      <div className="question-answer-container">
        <BottomNavigation
          value={index}
          onChange={(_, idx) => this.move(idx)}
          ref={this.navButtonContainerRef}
        >
          {[...Array(contentLen)].map((_, idx) => {
            return (
              <BottomNavigationAction
                label={`Q${idx + 1}`}
                value={idx}
                style={generateNavActionStyle(idx)}
                ref={idx === index && this.navButtonRef}
                key={idx}
                showLabel
              />
            );
          })}
        </BottomNavigation>
        <RightNoteBlock>
          {`平均正答率: ${questionContent.answerHistoryContentCounter
            ? (
              (questionContent.correctAnswerHistoryContentCounter / questionContent.answerHistoryContentCounter) * 100
            ).round(1) + "%"
            : "-"}
          `}
        </RightNoteBlock>
        <div className="markdown-padding-container">
          <MarkDown sentence={questionContent.sentence} />
        </div>
        <div className="question-answer-controller-container">
          <div className="question-answer-move-buttons-container">
            <Button onClick={this.onClickBefore} disabled={!index}>前へ</Button>
            <Button onClick={this.onClickNext} disabled={index >= contentLen - 1}>次へ</Button>
          </div>
          <div className="question-answer-buttons-container">
            {questionContent.choices.map((choice, idx) => {
              const style = generateChoiceStyle(choice, index) || defaultChoiceStyle;
              return (
                <Button
                  value={choice.id}
                  onClick={this.onClickChoice}
                  style={style}
                  disable={displayAnswer ? "true" : ""}
                  key={choice.id || idx}
                >
                  {choice.value ? (
                    <>
                      {displayAnswer && choice.isAnswer && <RadioButtonUncheckedIcon style={{ color: "limegreen" }} />}
                      <MarkDown
                        sentence={choice.value}
                        options={{ linkify: false, breaks: false }}
                        className="markdown-preview-in-button"
                      />
                    </>
                  ) : "　"}
                </Button>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    );
  }
}

QuestionAnswerBase.propTypes = propTypes;
QuestionAnswerBase.defaultProps = {
  onClickChoice: () => {},
  generateChoiceStyle: () => {},
  generateNavActionStyle: () => {},
};
export default QuestionAnswerBase;
