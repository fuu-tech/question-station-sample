import React from 'react';
import { useSelector } from 'react-redux';

import ProfileSettingForm from '../forms/ProfileSettingForm';
import { updateCurrentUser } from '../../actions/users';
import { successAlert } from '../../utils/alert';


const currentUserSelector = state => state.users.get('currentUser');
const confirmMessageSelector = state => state.options.get('confirmMessage');

const ProfileSetting = () => {
  const currentUser = useSelector(currentUserSelector);
  const confirmMessage = useSelector(confirmMessageSelector);

  const onSubmit = (params, dispatch) => {
    dispatch(updateCurrentUser(params));
    successAlert('保存されました');
  };

  const initialValues = currentUser.profile();
  if (!initialValues.tags.length) initialValues.tags.push({ value: "" });

  return (
    <ProfileSettingForm
      onSubmit={onSubmit}
      currentUser={currentUser}
      initialValues={initialValues}
      confirmMessage={confirmMessage}
    />
  );
};

export default ProfileSetting;
