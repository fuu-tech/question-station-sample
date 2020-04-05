import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  correctAnswerRate: PropTypes.number,
  height: PropTypes.string,
};

const CorrectAnswerRateBar = ({ correctAnswerRate, height }) => {
  const rate = correctAnswerRate === null ? 100 : correctAnswerRate;
  const formerColor = correctAnswerRate === null ? "#dddddd" : "limegreen";

  return (
    <div className="correct-answer-rate-bar-container">
      <div style={{ backgroundColor: formerColor, width: `${rate}%`, height }} />
      <div style={{ backgroundColor: "crimson", width: `${100 - rate}%`, height }} />
    </div>
  );
};

CorrectAnswerRateBar.propTypes = propTypes;
CorrectAnswerRateBar.defaultProps = { correctAnswerRate: null };
export default CorrectAnswerRateBar;
