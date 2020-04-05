import PropTypes from 'prop-types';
import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';

import InputWithMarkDownPreview from '../molecules/InputWithMarkDownPreview';
import SubmitButtonBlock from '../molecules/SubmitButtonBlock';
import FieldBlock from './FieldBlock';
import FieldArrayBlock from './FieldArrayBlock';
import TagsFields from './TagsFields';
import QuestionContentsFields from './QuestionContentsFields';
import { validateContentNewForm } from '../../validators/contentValidator';
import { banNewLine } from '../../validators/strValidator';
import { required } from '../../validators/required';


const propTypes = {
  isMobile: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({
    explanation: PropTypes.string,
    contentType: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({ map: PropTypes.func })),
  }),
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

class ContentNewForm extends React.Component {
  onClickContentType = (_, value) => {
    this.props.change("contentType", value);
  }

  renderTagsFields = ({ fields }) => {
    return (
      <TagsFields
        fields={fields}
        max={8}
        min={1}
        excludeValues={(this.props.formValues.tags || []).map(tag => tag.value)}
        change={this.props.change}
      />
    );
  }

  render() {
    const { isMobile, handleSubmit, formValues: { explanation }, change } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FieldBlock
          label="タイトル"
          name="title"
          validate={[required, banNewLine]}
          maxLength="50"
        />
        <FieldBlock
          component={InputWithMarkDownPreview}
          markDownValue={explanation}
          label="概要"
          name="explanation"
          maxLength="1000"
          help="どのようなクエスチョン・ディスカッションなのかを説明する項目です。"
          multiline
        />
        <FieldArrayBlock label="タグ" name="tags" component={this.renderTagsFields} />
        <FieldArray
          name="questionContents"
          component={QuestionContentsFields}
          isMobile={isMobile}
          change={change}
        />
        <SubmitButtonBlock>作成</SubmitButtonBlock>
      </form>
    );
  }
}

ContentNewForm.propTypes = propTypes;
export default reduxForm({
  form: 'contentNewForm',
  validate: validateContentNewForm,
})(ContentNewForm);
