import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  children: PropTypes.node.isRequired,
};

const RightNoteBlock = ({ children }) => {
  return (
    <div className="right-note-block">
      <div>
        {children}
      </div>
    </div>
  );
};

RightNoteBlock.propTypes = propTypes;
export default RightNoteBlock;
