import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import { alertColor } from '../../constants/style';


const propTypes = {
  style: PropTypes.shape({}),
};

const DeleteIconButton = ({ style, ...props }) => {
  const styleObj = {
    color: alertColor,
    ...style,
  };

  return (
    <IconButton style={styleObj} {...props}>
      <ClearIcon fontSize="small" />
    </IconButton>
  );
};

DeleteIconButton.propTypes = propTypes;
DeleteIconButton.defaultProps = { style: {} };
export default DeleteIconButton;
