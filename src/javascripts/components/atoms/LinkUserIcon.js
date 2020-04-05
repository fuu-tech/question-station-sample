import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setUser } from '../../actions/users';
import UserIcon from './UserIcon';
import Link from './Link';
import User from '../../models/User';
import SimplifiedUser from '../../models/SimplifiedUser';
import { routes } from '../../constants/routes';


const propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.instanceOf(User),
    PropTypes.instanceOf(SimplifiedUser)
  ]).isRequired,
  size: PropTypes.number,
};

const LinkUserIcon = ({ user, size, ...props }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setUser(User.fromJS(user)));
  };

  return (
    <Link
      to={routes.userPage(user.userDefinedId)}
      onClick={onClick}
      title={user.name}
    >
      <UserIcon user={user} size={size} {...props} />
    </Link>
  );
};

LinkUserIcon.propTypes = propTypes;
export default LinkUserIcon;
