import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';

import InputFieldComponent from './InputFieldComponent';
import FieldWithDeleteButton from './FieldWithDeleteButton';


const propTypes = {
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  disableDelete: PropTypes.bool,
  choice: PropTypes.shape({
    isAnswer: PropTypes.bool.isRequired,
  }).isRequired,
};

const ChoiceField = ({ name, change, onClickDelete, disableDelete, choice: { isAnswer } }) => {
  const onClick = () => {
    change(`${name}.isAnswer`, !isAnswer);
  };

  return (
    <div className="choice-field-container">
      <IconButton onClick={onClick}>
        {isAnswer ? (
          <RadioButtonUncheckedIcon style={{ color: 'limegreen' }} />
        ) : <CloseIcon style={{ color: 'red' }} />}
      </IconButton>
      <FieldWithDeleteButton
        onClickDelete={onClickDelete}
        disableDelete={disableDelete}
        name={`${name}.value`}
        component={InputFieldComponent}
        maxLength="100"
      />
    </div>
  );
};


ChoiceField.propTypes = propTypes;
export default ChoiceField;
