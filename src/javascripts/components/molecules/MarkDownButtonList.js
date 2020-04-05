import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import Button from '../atoms/Button';
import MarkDown from '../atoms/MarkDown';


const propTypes = {
  label: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    sentence: PropTypes.string.isRequired,
  })).isRequired,
};

const MarkDownButtonList = ({ label, buttons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={onClick}
          endIcon={isOpen ? <></> : <KeyboardArrowRightIcon />}
        >
          {isOpen ? <KeyboardArrowLeftIcon /> : label}
        </Button>
        {isOpen ? buttons.map((button) => (
          <Button key={button.value} {...button}>
            <MarkDown sentence={button.sentence} />
          </Button>
        )) : ""}
      </ButtonGroup>
    </div>
  );
};

MarkDownButtonList.propTypes = propTypes;
export default MarkDownButtonList;
