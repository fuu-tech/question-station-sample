import React from 'react';
import PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';

import Button from './Button';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func,
};

const SearchButton = ({ children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} startIcon={<Search />} {...props}>
      {children || "検索"}
    </Button>
  );
};

SearchButton.propTypes = propTypes;
SearchButton.defaultProps = {
  onClick: () => {}
};
export default SearchButton;
