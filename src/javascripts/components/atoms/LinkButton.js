import React from 'react';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Link from './Link';
import Button from './Button';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  to: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  disableIcon: PropTypes.bool,
  linkProps: PropTypes.shape({}),
};

const LinkButton = ({ children, to, disable, disableIcon, linkProps, ...props }) => {
  return (
    <Link
      to={to}
      disable={disable}
      disableTextDecoration
      {...linkProps}
    >
      <Button startIcon={disableIcon ? <></> : <NavigateNextIcon />} {...props}>
        {children || to}
      </Button>
    </Link>
  );
};

LinkButton.propTypes = propTypes;
LinkButton.defaultProps = { linkProps: {} };
export default LinkButton;
