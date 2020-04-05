import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  children: PropTypes.node.isRequired,
};

export const IsBookmarkIconFlashContext = createContext([false, () => {}]);
export const IsFavIconFlashContext = createContext([false, () => {}]);

const ContextProvider = ({ children }) => {
  const [isBookmarkIconFlash, setIsBookmarkIconFlash] = useState(false);
  const [isFavIconFlash, setIsFavIconFlash] = useState(false);
  return (
    <IsBookmarkIconFlashContext.Provider value={{ isBookmarkIconFlash, setIsBookmarkIconFlash }}>
      <IsFavIconFlashContext.Provider value={{ isFavIconFlash, setIsFavIconFlash }}>
        {children}
      </IsFavIconFlashContext.Provider>
    </IsBookmarkIconFlashContext.Provider>
  );
};

ContextProvider.propTypes = propTypes;
export default ContextProvider;
