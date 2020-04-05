import PropTypes from 'prop-types';
import * as React from 'react';
import { FieldArray, reduxForm, getFormValues as getFormValuesSrc } from 'redux-form';
import { withTranslation } from "react-i18next";

import { setConfirmMessage as setConfirmMessageAction } from '../../actions/options';
import LabelWithHelp from '../molecules/LabelWithHelp';
import SubmitButtonBlock from '../molecules/SubmitButtonBlock';
import InputWithMarkDownPreview from '../molecules/InputWithMarkDownPreview';
import FieldBlock from './FieldBlock';
import TagsFields from './TagsFields';
import User from '../../models/User';
import { store } from '../../store';
import { banNewLine } from '../../validators/strValidator';
import { required } from '../../validators/required';


const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired,
  confirmMessage: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const confirmEditMessage = "編集内容が破棄されますがよろしいですか？";
const setConfirmMessage = message => store.dispatch(setConfirmMessageAction(message));
const getFormValues = () => getFormValuesSrc('profileSettingForm')(store.getState()) || { tags: [] };

class ProfileSettingForm extends React.Component {
  componentWillUnmount() {
    setConfirmMessage("");
  }

  onChange = () => setTimeout(this.setConfirmMessage, 1);

  setConfirmMessage = () => {
    const { currentUser, confirmMessage } = this.props;
    const formValues = getFormValues();

    const isSameProfileObj = currentUser.isSameProfileObj(formValues);
    if (confirmMessage !== confirmEditMessage && !isSameProfileObj) {
      setConfirmMessage(confirmEditMessage);
    } else if (confirmMessage === confirmEditMessage && isSameProfileObj) {
      setConfirmMessage("");
    }
  }

  onSubmit = (e) => {
    setConfirmMessage("");
    this.props.handleSubmit(e);
  }

  renderTagsFields = (props) => {
    return (
      <TagsFields
        max={8}
        min={1}
        onChange={this.onChange}
        change={this.props.change}
        excludeValues={getFormValues().tags.map(tag => tag.value)}
        {...props}
      />
    );
  }

  render() {
    // const { t } = this.props;
    return (
      <div className="setting-form-container">
        <form onSubmit={this.onSubmit}>
          <FieldBlock
            label="ユーザー名"
            name="name"
            validate={[required, banNewLine]}
            maxLength="50"
            onChange={this.onChange}
          />
          <FieldBlock
            label="ユーザーID"
            help={`次のような用途に用いられます。
・ユーザーページのURLの一部
・ユーザー指定検索時の検索ワード

半角英字・数字・アンダーバーのみ使用可能です。`}
            name="userDefinedId"
            validate={[required, banNewLine]}
            maxLength="30"
            onChange={this.onChange}
          />
          <FieldBlock
            component={InputWithMarkDownPreview}
            label="自己紹介"
            name="introductionText"
            markDownValue={getFormValues().introductionText || ""}
            maxLength="500"
            onChange={this.onChange}
            multiline
          />
          <LabelWithHelp
            help={`タグを付けることで他ユーザに認知されやすくなります。8個まで設定可能です。

例: 高校二年、科学部、英語、J-POP`}
          >
            タグ
          </LabelWithHelp>
          <FieldArray name="tags" component={this.renderTagsFields} />
          <SubmitButtonBlock>保存</SubmitButtonBlock>
        </form>
      </div>
    );
  }
}

ProfileSettingForm.propTypes = propTypes;
export default reduxForm({
  form: 'profileSettingForm'
})(withTranslation(["model"])(ProfileSettingForm));
