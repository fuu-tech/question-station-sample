import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

import TagModel from '../../models/Tag';


const propTypes = {
  tag: PropTypes.instanceOf(TagModel).isRequired,
  onClick: PropTypes.func,
};

const Tag = ({ tag, onClick }) => {
  const label = tag.usedCounter !== null ? `${tag.usedCounter} ${tag.value}` : tag.value;
  return (
    <Chip
      onClick={onClick}
      label={label}
      data-value={tag.value}
    />
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = { onClick: () => {} };
export default Tag;
