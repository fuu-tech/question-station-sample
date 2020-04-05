import React from 'react';
import PropTypes from 'prop-types';
import { List as ListModel } from 'immutable';
import { List as ListUI } from '@material-ui/core';


const propTypes = {
  list: PropTypes.instanceOf(ListModel).isRequired,
  renderCard: PropTypes.func.isRequired,
};

const List = ({ list, renderCard, ...props }) => (
  <ListUI disablePadding {...props}>
    {list.map(val => renderCard(val))}
  </ListUI>
);

List.propTypes = propTypes;
export default List;
