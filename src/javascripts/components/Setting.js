import React from 'react';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import PageExplanation from './molecules/PageExplanation';
import ProfileSetting from './templates/ProfileSetting';


const Setting = () => {
  return (
    <div className="setting-body">
      <PageExplanation
        Icon={SettingsSharp}
        title="設定"
        explanation=""
      />
      <ProfileSetting />
    </div>
  );
};

export default Setting;
