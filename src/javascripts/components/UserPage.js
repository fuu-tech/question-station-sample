import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";

import LinkButton from './atoms/LinkButton';
import LinkTag from './atoms/LinkTag';
import MarkDown from './atoms/MarkDown';
import User from '../models/User';
import { search } from '../usecases/search';
import { routes } from '../constants/routes';
import { initialCurrentUser } from '../constants/initialValues';


const propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(User).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ userDefinedId: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  actions: PropTypes.shape({
    setUser: PropTypes.func.isRequired,
  }).isRequired,
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params }, actions: { setUser } } = props;
    if (params.userDefinedId === initialCurrentUser.userDefinedId) {
      setUser(initialCurrentUser);
    }
  }

  componentDidUpdate() {
    const { match: { params }, actions: { setUser } } = this.props;
    if (params.userDefinedId === initialCurrentUser.userDefinedId) {
      setUser(initialCurrentUser);
    }
  }

  onClickSearch = (e) => {
    e.preventDefault();
    const { user } = this.props;
    search({ word: `@${user.userDefinedId}` });
  }

  renderUserIcon = () => (
    <img src={this.props.user.iconUrl} alt="icon" className="userpage-circle" />
  )

  render() {
    const { isMobile, user } = this.props;

    if (!user.id) return <div>ユーザーが存在しません</div>;

    return (
      <div>
        <div className="userpage-out-frame">
          <div className="userpage-column">
            {isMobile || <div className="userpage-box-including-icon">{this.renderUserIcon()}</div>}
            <div className="userpage-profile-area">
              <div className="userpage-profile-head-container">
                {isMobile && this.renderUserIcon()}
                <div style={{ width: "100%" }}>
                  <div className="userpage-user-name">
                    {user.name}
                  </div>
                  <div className="userpage-user-id">
                    @
                    {user.userDefinedId}
                  </div>
                </div>
              </div>
              <div>
                <div className="userpage-column userpage-profile-part">
                  {user.tags.map(tag => <LinkTag tag={tag} key={tag.value} />)}
                </div>
                <LinkButton to={routes.search} onClick={this.onClickSearch}>
                  このユーザーで検索
                </LinkButton>
              </div>
            </div>
          </div>
          <div className="userpage-profile-text-container">
            <div className="userpage-profile-text-box">
              <MarkDown sentence={user.introductionText || "プロフィールが記入されていません"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


UserPage.propTypes = propTypes;
export default withTranslation(["model"])(UserPage);
