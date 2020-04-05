import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './organisms/Header';
import News from './News';
import Activity from '../containers/Activity';
import Histories from './Histories';
import Help from './Help';
import Search from '../containers/Search';
import UserPage from '../containers/UserPage';
import Setting from './Setting';
import NotFound from './NotFound';
import Login from './Login';
import ContentNew from '../containers/ContentNew';
import Content from '../containers/Content';
import QuestionAnswer from '../containers/QuestionAnswer';
import AnswerHistory from '../containers/AnswerHistory';
import User from '../models/User';
import { routes } from '../constants/routes';


const propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired,
  user: PropTypes.instanceOf(User),
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({}),
  }).isRequired,
};

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.redirectWhenInvalidPath();
  }

  componentDidUpdate() {
    this.redirectWhenInvalidPath();
  }

  redirectWhenInvalidPath = () => {
    const {
      history,
      currentUser,
      user,
      location,
    } = this.props;
    const { pathname, state: { from } = {} } = location;

    if (pathname === "/") history.replace(routes.activity);

    if (currentUser.id) {
      switch (pathname) {
        case routes.login:
          history.replace(from || routes.activity);
          break;
        default:
          break;
      }
    } else {
      switch (pathname) {
        case routes.activity:
        case routes.search:
        case routes.help:
        case routes.login:
        case routes.userPage(user.userDefinedId):
        case (new RegExp(routes.news('\\d+'))).test(pathname) && pathname:
        case (new RegExp(routes.content('\\d+'))).test(pathname) && pathname:
          break;
        default:
          history.replace(from || routes.login);
          break;
      }
    }
  }

  render() {
    return (
      <div className="index-body">
        <Header redirectWhenInvalidPath={this.redirectWhenInvalidPath} />
        <div className="content-body">
          <Switch>
            <Route exact path={routes.news(":id")} component={News} />
            <Route exact path={routes.activity} component={Activity} />
            <Route exact path={routes.search} component={Search} />
            <Route exact path={routes.histories} component={Histories} />
            <Route exact path={routes.setting} component={Setting} />
            <Route exact path={routes.help} component={Help} />
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.contentNew} component={ContentNew} />
            <Route exact path={routes.content(":id")} component={Content} />
            <Route exact path={routes.questionAnswer(":id")} component={QuestionAnswer} />
            <Route exact path={routes.answerHistoryShow(":id")} component={AnswerHistory} />
            <Route exact path={routes.userPage(":userDefinedId")} component={UserPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

RouteIndex.propTypes = propTypes;
export default withRouter(RouteIndex);
