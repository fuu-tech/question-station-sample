import React from 'react';
import PropTypes from 'prop-types';

import TagModel from '../../models/Tag';
import { search } from '../../usecases/search';
import Tag from './Tag';
import Link from './Link';
import { routes } from '../../constants/routes';


const propTypes = {
  tag: PropTypes.instanceOf(TagModel).isRequired,
};

const LinkTag = ({ tag }) => {
  const onClick = (e) => {
    e.preventDefault();
    const word = `#${e.currentTarget.dataset.value}`;
    search({ word, page: 1 });
  };

  return (
    <Link to={routes.search} disableTextDecoration>
      <Tag tag={tag} onClick={onClick} />
    </Link>
  );
};

LinkTag.propTypes = propTypes;
export default LinkTag;
