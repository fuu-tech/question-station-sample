import React from 'react';
import PropTypes from 'prop-types';

import MarkDownButtonList from './MarkDownButtonList';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const buttonsBase = [
  { sentence: "$\\alpha$", value: "$\\alpha$" },
  { sentence: "$\\beta$", value: "$\\beta$" },
  { sentence: "$\\gamma$", value: "$\\gamma$" },
  { sentence: "$\\delta$", value: "$\\delta$" },
  { sentence: "$\\epsilon$", value: "$\\epsilon$" },
  { sentence: "$\\varepsilon$", value: "$\\varepsilon$" },
  { sentence: "$\\zeta$", value: "$\\zeta$" },
  { sentence: "$\\eta$", value: "$\\eta$" },
  { sentence: "$\\theta$", value: "$\\theta$" },
  { sentence: "$\\vartheta$", value: "$\\vartheta$" },
  { sentence: "$\\iota$", value: "$\\iota$" },
  { sentence: "$\\kappa$", value: "$\\kappa$" },
  { sentence: "$\\lambda$", value: "$\\lambda$" },
  { sentence: "$\\mu$", value: "$\\mu$" },
  { sentence: "$\\nu$", value: "$\\nu$" },
  { sentence: "$\\xi$", value: "$\\xi$" },
  { sentence: "$o$", value: "$o$" },
  { sentence: "$\\pi$", value: "$\\pi$" },
  { sentence: "$\\varpi$", value: "$\\varpi$" },
  { sentence: "$\\rho$", value: "$\\rho$" },
  { sentence: "$\\varrho$", value: "$\\varrho$" },
  { sentence: "$\\sigma$", value: "$\\sigma$" },
  { sentence: "$\\tau$", value: "$\\tau$" },
  { sentence: "$\\upsilon$", value: "$\\upsilon$" },
  { sentence: "$\\phi$", value: "$\\phi$" },
  { sentence: "$\\varphi$", value: "$\\varphi$" },
  { sentence: "$\\chi$", value: "$\\chi$" },
  { sentence: "$\\psi$", value: "$\\psi$" },
  { sentence: "$\\omega$", value: "$\\omega$" },
];

const GleekLetterButtonList = ({ onClick }) => {
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

  return <MarkDownButtonList label="文字" buttons={buttons} />;
};

GleekLetterButtonList.propTypes = propTypes;
export default GleekLetterButtonList;
