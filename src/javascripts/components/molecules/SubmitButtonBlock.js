import React from 'react';
import PropTypes from 'prop-types';

import Button from '../atoms/Button';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

const SubmitButtonBlock = ({ children, ...props }) => (
  <div className="submit-button-block">
    <Button type="submit" {...props}>
      {children}
    </Button>
  </div>
);

SubmitButtonBlock.propTypes = propTypes;
export default SubmitButtonBlock;
