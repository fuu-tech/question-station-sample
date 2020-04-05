import React from 'react';
import PropTypes from 'prop-types';

import MarkDownButtonList from './MarkDownButtonList';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const buttonsBase = [
  { sentence: "$\\lim$", value: "$\\lim_{}{}$" },
  { sentence: "${}\\rightarrow{}$", value: "$\\rightarrow$" },
  { sentence: "${}\\leftarrow{}$", value: "$\\leftarrow$" },
  { sentence: "$\\infty$", value: "$\\infty$" }
];

const LimitSymbolButtonList = ({ onClick }) => {
  const buttons = buttonsBase.map((attrs) => {
    return { onClick, ...attrs };
  });

  return <MarkDownButtonList label="極限" buttons={buttons} />;
};

LimitSymbolButtonList.propTypes = propTypes;
export default LimitSymbolButtonList;
