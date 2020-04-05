import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Tag from '../atoms/Tag';


const propTypes = {
  tags: PropTypes.instanceOf(List),
};

const isMobileSelector = state => state.options.get('isMobile');

const Tags = ({ tags }) => {
  const isMobile = useSelector(isMobileSelector);

  return isMobile ? (
    <>
      {tags.slice(0, 3).map(tag => <Tag tag={tag} key={tag.value} />)}
      {tags.size > 3 ? `他${tags.size - 3}` : ""}
    </>
  ) : tags.map(tag => <Tag tag={tag} key={tag.value} />);
};

Tags.propTypes = propTypes;
export default Tags;
