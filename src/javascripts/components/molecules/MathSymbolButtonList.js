import React from 'react';
import PropTypes from 'prop-types';

import MarkDownButtonList from './MarkDownButtonList';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const buttonsBase = [
  { sentence: "$\\int_{}^{}{}dx$", value: "$\\int_{}^{}{}dx$" },
  { sentence: "$\\sum_{}^{}{}$", value: "$\\sum_{}^{}{}$" },
  { sentence: "$\\prod_{}^{}{}$", value: "$\\prod_{}^{}{}$" },
  { sentence: "$a/b$", value: "$\\frac{a}{b}$" },
  { sentence: "$x^{a}$", value: "$^{}$" },
  { sentence: "$\\sqrt[n]{x}$", value: "$\\sqrt[]{}$" },
];

const MathSymbolButtonList = ({ onClick }) => {
  const buttons = buttonsBase.map((attrs) => {
    return { onClick, ...attrs };
  });

  return <MarkDownButtonList label="演算" buttons={buttons} />;
};

MathSymbolButtonList.propTypes = propTypes;
export default MathSymbolButtonList;
