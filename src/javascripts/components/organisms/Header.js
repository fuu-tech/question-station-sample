import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeSharp from '@material-ui/icons/HomeSharp';
import CreateSharp from '@material-ui/icons/CreateSharp';
import Search from '@material-ui/icons/Search';
import HistorySharp from '@material-ui/icons/HistorySharp';
import SettingsSharp from '@material-ui/icons/SettingsSharp';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LinkUserIcon from '../atoms/LinkUserIcon';
import Link from '../atoms/Link';
import { logoutUser } from '../../actions/users';
import { successAlert } from '../../utils/alert';
import { routes } from '../../constants/routes';


const propTypes = {
  redirectWhenInvalidPath: PropTypes.func.isRequired,
};

const currentUserSelector = state => state.users.get('currentUser');
const isMobileSelector = state => state.options.get('isMobile');

const Header = ({ redirectWhenInvalidPath }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobile = useSelector(isMobileSelector);
  const containerRef = useRef();

  const onClick = (e) => {
    if (!isMobile) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();
    containerRef.current.scrollBy({
      left: targetRect.left - containerRect.left - containerRect.width / 2,
      behavior: "smooth",
    });
  };

  const onClickLogout = () => {
    if (!window.confirm("ログアウトします")) return;

    dispatch(logoutUser());
    localStorage.clear();
    successAlert('ログアウトしました');
    history.replace(history.location.pathname);
    redirectWhenInvalidPath(routes.activity);
  };

  const overflowStyle = isMobile ? { overflowX: "scroll" } : {};

  return (
    <div className="header-container">
      <div className="header-content-container">
        <div />
        <div className="header-buttons-container">
          <div className="header-nav-buttons-container" style={overflowStyle} ref={containerRef}>
            <Link title="ホーム" to={routes.activity} onClick={onClick} className="icon-button" willScrollTop>
              <HomeSharp />
            </Link>
            {currentUser.id ? (
              <>
                <Link title="コンテンツ作成" to={routes.contentNew} onClick={onClick} className="icon-button" willScrollTop>
                  <CreateSharp />
                </Link>
              </>
            ) : ""}
            <Link title="検索" to={routes.search} onClick={onClick} className="icon-button" willScrollTop>
              <Search />
            </Link>
            {currentUser.id ? (
              <>
                <Link title="履歴" to={routes.histories} onClick={onClick} className="icon-button" willScrollTop>
                  <HistorySharp />
                </Link>
                <Link title="設定" to={routes.setting} onClick={onClick} className="icon-button" willScrollTop>
                  <SettingsSharp />
                </Link>
              </>
            ) : ""}
            <Link title="ヘルプ" to={routes.help} onClick={onClick} className="icon-button" willScrollTop>
              <HelpOutline />
            </Link>
            {currentUser.id ? (
              <span title="ログアウト" onClick={onClickLogout} className="icon-button">
                <ExitToAppIcon />
              </span>
            ) : (
              <Link to={routes.login} onClick={onClick} title="ログイン" willScrollTop>
                <span className="icon-button">
                  <ExitToAppIcon />
                </span>
              </Link>
            )}
          </div>
          {currentUser.id && <LinkUserIcon user={currentUser} size={40} />}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
export default Header;
