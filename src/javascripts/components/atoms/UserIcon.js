import React from 'react';
import PropTypes from 'prop-types';

import User from '../../models/User';
import SimplifiedUser from '../../models/SimplifiedUser';


const propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.instanceOf(User),
    PropTypes.instanceOf(SimplifiedUser)
  ]).isRequired,
  size: PropTypes.number,
};

const UserIcon = ({ user, size, ...props }) => {
  const style = size ? { width: size, height: size, borderRadius: size / 2 } : {};

  return (
    <img
      src={user.iconUrl}
      alt="icon"
      className="link-user-icon-circle"
      style={style}
      {...props}
    />
  );
};

UserIcon.propTypes = propTypes;
export default UserIcon;
