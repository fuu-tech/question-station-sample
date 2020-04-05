import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  isDesplay: PropTypes.bool.isRequired,
  setIsDesplay: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const MoveToIcon = ({ isDesplay, setIsDesplay, children, ...props }) => {
  useEffect(() => {
    if (isDesplay) setTimeout(() => setIsDesplay(false), 375);
  }, [isDesplay]);

  if (!isDesplay) return <></>;

  return (
    <div className="move-to-icon" {...props}>
      {children}
    </div>
  );
};

MoveToIcon.propTypes = propTypes;
export default MoveToIcon;
