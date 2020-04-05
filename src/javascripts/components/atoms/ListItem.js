import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as ListItemDom } from '@material-ui/core';


const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

const ListItem = ({ children, style, ...props }) => {
  return (
    <ListItemDom disableGutters style={{ display: "flex", ...style }} {...props}>
      {children}
    </ListItemDom>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = { style: {} };
export default ListItem;
