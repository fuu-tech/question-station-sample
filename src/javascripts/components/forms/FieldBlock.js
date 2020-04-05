import PropTypes from 'prop-types';
import * as React from 'react';
import { Field } from 'redux-form';

import LabelWithHelp from '../molecules/LabelWithHelp';
import InputFieldComponent from './InputFieldComponent';


const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  children: PropTypes.node,
};

const FieldBlock = ({ label, name, help, children, ...props }) => {
  return (
    <div className="field-block">
      {label && (
        <LabelWithHelp help={help}>
          {label}
        </LabelWithHelp>
      )}
      <Field
        name={name}
        component={InputFieldComponent}
        {...props}
      >
        {children}
      </Field>
    </div>
  );
};

FieldBlock.propTypes = propTypes;
export default FieldBlock;
