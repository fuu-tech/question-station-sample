import PropTypes from 'prop-types';
import * as React from 'react';
import { FieldArray } from 'redux-form';

import LabelWithHelp from '../molecules/LabelWithHelp';


const propTypes = {
  label: PropTypes.string,
  help: PropTypes.PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

const FieldArrayBlock = ({ label, help, ...props }) => {
  return (
    <div className="field-block">
      {label && <LabelWithHelp help={help}>{label}</LabelWithHelp>}
      <FieldArray {...props} />
    </div>
  );
};

FieldArrayBlock.propTypes = propTypes;
export default FieldArrayBlock;
