import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link as LinkDom } from 'react-router-dom';

import { setConfirmMessage } from '../../actions/options';
import { scrollTop } from '../../utils/scroll';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
  disable: PropTypes.bool,
  disableTextDecoration: PropTypes.bool,
  willScrollTop: PropTypes.bool,
};

const confirmMessageSelector = state => state.options.get('confirmMessage');

const Link = ({
  to, children, onClick, disable, disableTextDecoration, willScrollTop, style, ...props
}) => {
  const dispatch = useDispatch();
  const confirmMessage = useSelector(confirmMessageSelector);
  const { location } = useHistory();

  const onClickLink = (e) => {
    let shouldMove = true;
    if (onClick) {
      const onClickRes = onClick(e);
      shouldMove = onClickRes === undefined ? true : onClickRes;
    }

    if (disable || !shouldMove || location.pathname === to) {
      e.preventDefault();
      return;
    }

    if (confirmMessage) {
      if (window.confirm(confirmMessage)) {
        dispatch(setConfirmMessage(""));
        willScrollTop && scrollTop();
      } else {
        e.preventDefault();
      }
    } else willScrollTop && scrollTop();
  };

  const prevPath = location.pathname + location.search + location.hash;
  const toObj = typeof to === 'string' ? { pathname: to, state: { from: prevPath } } : to;

  const styleProp = disableTextDecoration ? { textDecoration: 'none', color: 'black', ...style } : style;

  return (
    <LinkDom to={toObj} onClick={onClickLink} className="link" style={styleProp} {...props}>
      {children}
    </LinkDom>
  );
};


Link.propTypes = propTypes;
Link.defaultProps = { style: {} };
export default Link;
