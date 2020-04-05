import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

const HelpButtonWithBalloon = ({ children }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(!open);
  const ref = useRef(null);

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <Tooltip title={children} ref={ref} open={open} placement="top-start">
      <IconButton onClick={onClick}>
        <HelpOutlineIcon />
      </IconButton>
    </Tooltip>
  );
};

HelpButtonWithBalloon.propTypes = propTypes;
export default HelpButtonWithBalloon;
