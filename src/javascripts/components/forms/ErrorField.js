import PropTypes from 'prop-types';
import * as React from 'react';
import { Field } from 'redux-form';


const errorTextPropTypes = {
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  createContainerClass: PropTypes.func.isRequired,
};

const ErrorBlock = ({ createContainerClass, meta }) => {
  const errorText = meta.error;
  return (
    <div className={createContainerClass(errorText)}>
      <span className="note">{errorText}</span>
    </div>
  );
};
ErrorBlock.propTypes = errorTextPropTypes;


const propTypes = {
  name: PropTypes.string.isRequired,
  createContainerClass: PropTypes.func,
};

const ErrorField = ({ name, createContainerClass, ...props }) => (
  <Field
    name={name}
    createContainerClass={createContainerClass}
    component={ErrorBlock}
    {...props}
  />
);

ErrorField.propTypes = propTypes;
ErrorField.defaultProps = {
  createContainerClass: () => {
    return {};
  },
};
export default ErrorField;
