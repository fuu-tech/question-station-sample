import React from 'react';
import PropTypes from 'prop-types';

import MarkDownButtonList from './MarkDownButtonList';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const buttonsBase = [
  { sentence: "$+$", value: "$+$" },
  { sentence: "$-$", value: "$-$" },
  { sentence: "$\\times$", value: "$\\times$" },
  { sentence: "$\\div$", value: "$\\div$" },
  { sentence: "$\\pm$", value: "$\\pm$" },
  { sentence: "$=$", value: "=" },
  { sentence: "$>$", value: "$>$" },
  { sentence: "$\\geq$", value: "$\\geq$" },
  { sentence: "$<$", value: "$<$" },
  { sentence: "$\\leq$", value: "$\\leq$" },
];

const BasicSymbolButtonList = ({ onClick }) => {
  const onClickAddToCurPreMidBracket = (e) => {
    onClick(e, (value, formerStr, latterStr) => {
      let nextCursolPos = value.substr(value.indexOf('{', 0)).length;
      if (formerStr.indexOf('$') !== -1 && latterStr.indexOf('$') !== -1) {
        nextCursolPos -= 1;
      }
      return nextCursolPos;
    });
  };

  const buttons = buttonsBase.map((attrs) => {
    return { onClick: onClickAddToCurPreMidBracket, ...attrs };
  });

  return <MarkDownButtonList label="基本" buttons={buttons} />;
};

BasicSymbolButtonList.propTypes = propTypes;
export default BasicSymbolButtonList;
