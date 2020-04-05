import React from 'react';
import PropTypes from 'prop-types';
import { List as ListModel } from 'immutable';

import List from '../atoms/List';
import ContentCard from '../molecules/ContentCard';


const propTypes = {
  contents: PropTypes.instanceOf(ListModel).isRequired,
  renderCardButtons: PropTypes.func,
};

const ContentList = ({ contents, renderCardButtons }) => {
  const renderCard = (content) => {
    return (
      <ContentCard
        content={content}
        renderButtons={renderCardButtons}
        key={content.id}
      />
    );
  };

  return (
    <List
      list={contents}
      renderCard={renderCard}
    />
  );
};

ContentList.propTypes = propTypes;
export default ContentList;
