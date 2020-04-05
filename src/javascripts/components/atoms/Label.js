import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const Label = ({ children, ...props }) => {
  return (
    <div className="label" {...props}>
      {children}
    </div>
  );
};

Label.propTypes = propTypes;
export default Label;
