import React from 'react';
import { useDispatch } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from './atoms/Button';
import MarkDown from './atoms/MarkDown';
import PageExplanation from './molecules/PageExplanation';
import { initCurrentUser } from '../actions/users';
import { termOfServiceText } from '../constants/markdownText/help/termOfService';
import { privacypolicyText } from '../constants/markdownText/help/privacypolicy';


const Login = () => {
  const dispatch = useDispatch();
  const login = () => {
    dispatch(initCurrentUser());
    localStorage.setItem("logined", true);
  };

  return (
    <div>
      <PageExplanation
        Icon={ExitToAppIcon}
        title="会員登録 / ログイン"
        explanation="利用規約およびプライバシーポリシーを必ずお読みの上、同意していただけた方のみご登録ください。"
      />
      <div className="term-panels-container">
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>利用規約</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MarkDown sentence={termOfServiceText} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>プライバシーポリシー</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MarkDown sentence={privacypolicyText} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
      <div className="login-button-contaner">
        <Button onClick={login}>
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default Login;
