import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';

import ChoiceField from './ChoiceField';
import FieldBlock from './FieldBlock';
import FieldArrayBlock from './FieldArrayBlock';
import QuestionContentsFieldsButtons from './QuestionContentsFieldsButtons';
import ErrorField from './ErrorField';
import Label from '../atoms/Label';
import Button from '../atoms/Button';
import MarkDownInput from '../molecules/MarkDownInput';
import MarkDown from '../atoms/MarkDown';
import QuestionAnswerBase from '../templates/QuestionAnswerBase';
import QuestionContent from '../../models/QuestionContent';
import { required } from '../../validators/required';


const propTypes = {
  isMobile: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    push: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }).isRequired,
  change: PropTypes.func.isRequired,
};

class QuestionContentsFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentIndex: 0, displayPreview: false };
    this.renderStack = [];
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  shouldComponentUpdate(_, nextState) {
    const { contentIndex, displayPreview } = this.state;
    if (contentIndex !== nextState.contentIndex) return true;
    if (displayPreview !== nextState.displayPreview) return true;

    this.renderStack.push(1);

    setTimeout(() => {
      this.renderStack.pop();
      if (this.renderStack.length === 0 && !this.unmounted) this.forceUpdate();
    }, 100);
    return false;
  }

  move = (index, force = false) => {
    const { fields } = this.props;
    if (force || (index >= 0 && index < fields.length)) {
      this.setState({ contentIndex: index });
    }
  }

  onClickPreview = () => {
    this.setState((state) => {
      return { displayPreview: !state.displayPreview };
    });
  }

  renderChoices = ({ fields }) => {
    return (
      <div>
        <ErrorField name={`${fields.name}.base`} />
        {fields.map((name, choiceIndex) => {
          return (
            <ChoiceField
              name={name}
              change={this.props.change}
              onClickDelete={() => fields.remove(choiceIndex)}
              disableDelete={fields.length <= 2}
              choice={fields.get(choiceIndex)}
              key={choiceIndex}
            />
          );
        })}
        {fields.length < 8 && (
          <Button onClick={() => fields.push({ value: "", isAnswer: false })}>
            追加
          </Button>
        )}
      </div>
    );
  }

  render() {
    const { isMobile, fields } = this.props;
    const { contentIndex, displayPreview } = this.state;
    const questionContent = fields.get(contentIndex) || new QuestionContent();
    const questionContentForPreview = {
      ...questionContent,
      choices: questionContent.choices.uniq('value').compact('value'),
    };
    const name = `${fields.name}[${contentIndex}]`;

    const boxStyle = isMobile ? { width: "-webkit-fill-available" } : {};

    return (
      <div className="question-content-new-container">
        <div className="question-content-new-title">
          {`Q${contentIndex + 1}  / ${fields.length}`}
          <QuestionContentsFieldsButtons
            move={this.move}
            contentIndex={contentIndex}
            fields={fields}
          />
          {isMobile && (
            <Button onClick={this.onClickPreview}>
              {displayPreview ? "編集へ" : "プレビューへ"}
            </Button>
          )}
        </div>
        <div className="question-content-new-box">
          {(!isMobile || !displayPreview) && (
            <div className="question-content-new-side-box" style={boxStyle}>
              <FieldBlock
                component={MarkDownInput}
                change={this.props.change}
                label="問題文"
                name={`${name}.sentence`}
                validate={required}
                maxLength="1000"
                multiline
              />
              <FieldArrayBlock
                label="選択肢"
                name={`${name}.choices`}
                component={this.renderChoices}
                help={(
                  <>
                    <RadioButtonUncheckedIcon style={{ color: 'limegreen', fontSize: "1rem" }} />
                    <CloseIcon style={{ color: 'red', fontSize: "1rem" }} />
                    ボタンを押すと、その選択肢が正答か否かを切り替えることができます。
                    また、選択肢は出題の度に順序がシャッフルされます。
                  </>
                )}
              />
              <FieldBlock
                label="解説"
                name={`${name}.explanation`}
                maxLength="1000"
                multiline
              />
            </div>
          )}
          {(!isMobile || displayPreview) && (
            <div className="question-content-new-side-box" style={boxStyle}>
              <div>プレビュー</div>
              <QuestionAnswerBase
                questionContent={questionContentForPreview}
                contentLen={fields.length}
                index={contentIndex}
                updateIndex={index => this.move(index)}
              >
                <div>
                  <Label>解説（実際の解答画面では表示されません）</Label>
                  <MarkDown sentence={questionContent.explanation} />
                </div>
              </QuestionAnswerBase>
            </div>
          )}
        </div>
        <ErrorField
          name={`${fields.name}.base`}
          createContainerClass={(errorText) => {
            return errorText ? "question-contents-error-fields" : "";
          }}
        />
      </div>
    );
  }
}

QuestionContentsFields.propTypes = propTypes;
export default QuestionContentsFields;
