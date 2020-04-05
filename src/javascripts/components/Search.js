import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';

import SearchForm from './forms/SearchForm';
import PageExplanation from './molecules/PageExplanation';
import PaginationButtons from './molecules/PaginationButtons';


const propTypes = {
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  searchValuesCache: PropTypes.shape({}).isRequired,
  formValues: PropTypes.shape({
    page: PropTypes.number.isRequired,
    searchType: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }).isRequired,
  actions: PropTypes.shape({
    change: PropTypes.func.isRequired,
    cacheSearchValues: PropTypes.func.isRequired,
  }).isRequired,
};

class Search extends React.Component {
  onClickPageNum = (_, page) => {
    const { actions: { change } } = this.props;
    change('searchForm', 'page', page);
  }

  render() {
    const {
      totalPages,
      totalCount,
      searchValuesCache,
      formValues,
      actions: { cacheSearchValues }
    } = this.props;

    return (
      <div>
        <PageExplanation
          Icon={SearchIcon}
          title="検索"
          explanation=""
        />
        <div className="search-form-wrapper">
          <SearchForm
            onSubmit={() => {}}
            totalCount={totalCount}
            initialValues={searchValuesCache}
            formValues={formValues}
            cacheSearchValues={cacheSearchValues}
          />
        </div>
        サンプルなので何も取得しません
        <PaginationButtons
          page={formValues.page}
          totalPages={totalPages}
          onClick={this.onClickPageNum}
        />
      </div>
    );
  }
}

Search.propTypes = propTypes;
export default Search;
