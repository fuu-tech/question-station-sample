import React from 'react';
import PropTypes from 'prop-types';
import { Tab as TabUI } from '@material-ui/core';


const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const Tab = ({ label, value, className, ...props }) => {
  return (
    <TabUI
      label={label}
      value={value}
      className={`tab ${className || ""}`}
      {...props}
    />
  );
};

Tab.propTypes = propTypes;
export default Tab;
