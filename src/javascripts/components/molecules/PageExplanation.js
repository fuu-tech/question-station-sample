import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/Label';


const propTypes = {
  Icon: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
  explanation: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const PageExplanation = ({ Icon, title, explanation }) => {
  let displayExplanation = explanation;
  if (typeof (explanation) === "string" && explanation.length) {
    displayExplanation = <div>{explanation}</div>;
  }
  return (
    <div className="page-explanation">
      <Label className="page-title">
        <Icon style={{ position: "relative", top: "4px", fontSize: "40px" }} />
        {title}
      </Label>
      {displayExplanation}
    </div>
  );
};

PageExplanation.propTypes = propTypes;
export default PageExplanation;
