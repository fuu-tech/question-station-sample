import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';


const propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

const PaginationButtons = ({ page, totalPages, onClick }) => {
  if (!totalPages) return "";

  return (
    <div className="pagination-button-container">
      <Pagination count={totalPages} page={page} onChange={onClick} />
    </div>
  );
};

PaginationButtons.propTypes = propTypes;
export default PaginationButtons;
