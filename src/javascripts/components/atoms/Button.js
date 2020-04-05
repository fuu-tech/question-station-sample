import React from 'react';
import PropTypes from 'prop-types';
import ButtonUI from '@material-ui/core/Button';

import { themeColor1 } from '../../constants/style';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
};

const Button = ({ children, disabled, style, ...props }) => {
  const styleObj = disabled ? {} : {
    backgroundColor: themeColor1,
    color: "white",
    ...style,
  };

  return (
    <ButtonUI
      style={styleObj}
      variant="outlined"
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonUI>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = { style: {} };
export default Button;
