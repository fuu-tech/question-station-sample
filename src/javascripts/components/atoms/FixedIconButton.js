import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  style: PropTypes.shape({}),
};

const FixedIconButton = ({ children, style, ...props }) => {
  const styleObj = {
    position: "fixed",
    bottom: "56px",
    left: "8px",
    opacity: 0.8,
    ...style,
  };
  return (
    <Fab style={styleObj} {...props}>
      {children}
    </Fab>
  );
};

FixedIconButton.propTypes = propTypes;
FixedIconButton.defaultProps = { style: {} };
export default FixedIconButton;
