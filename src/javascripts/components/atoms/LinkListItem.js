import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';
import ListItem from './ListItem';


const propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
  disableTextDecoration: PropTypes.bool,
  linkProps: PropTypes.shape({}),
  style: PropTypes.shape({}),
  unlinkedChildren: PropTypes.node,
  className: PropTypes.string,
};

const LinkListItem = ({
  children, to, onClick, disable, disableTextDecoration, linkProps, unlinkedChildren, className, style, ...props
}) => {
  const integratedLinkProps = {
    onClick,
    to,
    disable,
    disableTextDecoration,
    ...linkProps
  };

  return (
    <ListItem className={`link-list-item ${className || ""}`} style={style} {...props}>
      <Link style={{ width: '100%' }} {...integratedLinkProps}>
        {children}
      </Link>
      {unlinkedChildren}
    </ListItem>
  );
};

LinkListItem.propTypes = propTypes;
LinkListItem.defaultProps = { linkProps: {}, style: {} };
export default LinkListItem;
