import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


const propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }).isRequired,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool,
  multiline: PropTypes.bool,
  style: PropTypes.shape({}),
};

const InputFieldComponent = ({ input, meta, multiline, error = true, style, maxLength, ...props }) => {
  const errorText = error && meta.touched && meta.error;
  const styleObj = multiline ? { minHeight: "5em", ...style } : style;

  return (
    <TextField
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      margin="dense"
      inputProps={{ style: styleObj, maxLength }}
      multiline={multiline}
      fullWidth
      {...input}
      {...props}
    />
  );
};

InputFieldComponent.propTypes = propTypes;
InputFieldComponent.defaultProps = { style: {} };
export default InputFieldComponent;
