import React from 'react';
import PropTypes from 'prop-types';
import HistorySharp from '@material-ui/icons/HistorySharp';

import PageExplanation from './molecules/PageExplanation';
import AnswerHistories from '../containers/templates/AnswerHistories';


const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    hash: PropTypes.string,
  }).isRequired,
};

const Histories = () => {
  return (
    <div>
      <PageExplanation
        Icon={HistorySharp}
        title="履歴"
        explanation=""
      />
      <AnswerHistories />
    </div>
  );
};

Histories.propTypes = propTypes;
export default Histories;
