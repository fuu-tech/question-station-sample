import PropTypes from 'prop-types';
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';

import InputFieldComponent from './InputFieldComponent';
import SearchButton from '../atoms/SearchButton';
import Tabs from '../molecules/Tabs';
import HelpButtonWithBalloon from '../molecules/HelpButtonWithBalloon';
import { sortTypesSelector } from '../../utils/sortTypesSelector';
import { searchTypes } from '../../constants/searchTypes';


const propTypes = {
  totalCount: PropTypes.number,
  formValues: PropTypes.shape({
    searchType: PropTypes.string.isRequired,
    sortKey: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

class SearchForm extends React.Component {
  onChangeWithSubmit = () => {
    setTimeout(this.props.handleSubmit, 1);
  }

  onChangeSearchTypeTab = (_, value) => {
    const { change, formValues: { sortKey } } = this.props;
    change('searchType', value);
    change('page', 1);
    const nextSortTypesValues = Object.values(sortTypesSelector(value));
    if (!nextSortTypesValues.includes(sortKey)) {
      change('sortKey', nextSortTypesValues[0]);
    }
    this.onChangeWithSubmit();
  }

  renderOrderField = () => {
    const { formValues: { searchType }, t } = this.props;
    const sortTypes = sortTypesSelector(searchType);

    return (
      <>
        {"ソート順: "}
        <Field name="sortKey" component="select" onChange={this.onChangeWithSubmit} style={{ height: "100%" }}>
          {Object.entries(sortTypes).map(([key, val]) => {
            return <option value={val} key={key}>{t(`label:${key}`)}</option>;
          })}
        </Field>
      </>
    );
  }

  render() {
    const { totalCount, formValues: { searchType } } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="word"
          component={InputFieldComponent}
          placeholder="検索"
        />
        <div className="search-form-options-container">
          <div>
            {this.renderOrderField()}
            <HelpButtonWithBalloon>
              {`ここでの「コンテンツ」はクエスチョン＋ディスカッションのことを指します。

  検索ワードについて
・入力されたワードからタイトル、概要、タグなどから部分一致により絞り込みを行います。
・複数のワードを空白区切りにすることでAND検索が可能です。
・「#タグ名」でタグの完全一致による絞り込みが可能です。
・「@USER_ID」でユーザーによる絞り込みが可能です。
・問題集の場合、「$コンテンツID（数値）」で問題集にそのコンテンツが含まれている問題集のみに絞り込みが可能です。コンテンツIDはコンテンツページのURLの末尾の数値です。
例: 「英語 #大学受験 @Question_Station」 => 「大学受験」タグが付いた「Question_Station」というユーザーIDのユーザーの「英語」という文字を含む検索対象が表示されます。`}
            </HelpButtonWithBalloon>
          </div>
          <SearchButton type="submit">検索</SearchButton>
        </div>
        {totalCount !== null ? `合計${totalCount}件` : ""}
        <Tabs
          value={searchType}
          onChange={this.onChangeSearchTypeTab}
          options={searchTypes}
        />
      </form>
    );
  }
}

SearchForm.propTypes = propTypes;
export default reduxForm({
  form: 'searchForm'
})(withTranslation(["label"])(SearchForm));
