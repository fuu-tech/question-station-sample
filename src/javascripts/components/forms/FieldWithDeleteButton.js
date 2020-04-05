import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import DeleteIconButton from '../atoms/DeleteIconButton';


const propTypes = {
  onClickDelete: PropTypes.func,
  buttonProps: PropTypes.shape({}),
  disableDelete: PropTypes.bool,
};

const FieldWithDeleteButton = ({ onClickDelete, buttonProps, disableDelete, ...props }) => (
  <div className="input-with-clear-button-wrapper">
    <Field {...props} />
    {disableDelete || (
      <div className="tag-input-clear-button">
        <DeleteIconButton
          onClick={onClickDelete}
          {...buttonProps}
        />
      </div>
    )}
  </div>
);

FieldWithDeleteButton.propTypes = propTypes;
FieldWithDeleteButton.defaultProps = { onClickDelete: () => {}, buttonProps: {} };
export default FieldWithDeleteButton;
