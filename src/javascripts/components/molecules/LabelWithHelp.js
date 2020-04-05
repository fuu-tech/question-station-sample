import PropTypes from 'prop-types';
import * as React from 'react';

import Label from '../atoms/Label';
import HelpButtonWithBalloon from './HelpButtonWithBalloon';


const propTypes = {
  children: PropTypes.string,
  help: PropTypes.PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

const LabelWithHelp = ({ help, children, ...props }) => {
  return (
    <Label {...props}>
      {children}
      {help && (
        <HelpButtonWithBalloon>
          {help}
        </HelpButtonWithBalloon>
      )}
    </Label>
  );
};

LabelWithHelp.propTypes = propTypes;
export default LabelWithHelp;
