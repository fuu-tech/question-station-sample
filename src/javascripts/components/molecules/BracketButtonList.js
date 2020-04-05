import React from 'react';
import PropTypes from 'prop-types';

import MarkDownButtonList from './MarkDownButtonList';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const buttonsBase = [
  { sentence: "$()$", value: "$\\left( {} \\right)$" },
  { sentence: "$[]$", value: "$\\left[ {} \\right]$" },
  { sentence: "$||$", value: "$\\left| {} \\right|$" },
  { sentence: "{}", value: "$\\left\\{ {} \\right\\}$" },
];

const BracketButtonList = ({ onClick }) => {
  const onClickAddToCurPreMidBracket = (e) => {
    onClick(e, value => value.substr(value.indexOf("{}", 0)).length);
  };

  const buttons = buttonsBase.map((attrs) => {
    return { onClick: onClickAddToCurPreMidBracket, ...attrs };
  });

  return <MarkDownButtonList label="括弧" buttons={buttons} />;
};

BracketButtonList.propTypes = propTypes;
export default BracketButtonList;
