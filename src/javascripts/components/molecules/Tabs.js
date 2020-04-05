import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Tabs as TabsUI } from '@material-ui/core';

import Tab from '../atoms/Tab';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
  tabProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};

const isMobileSelector = state => state.options.get('isMobile');

const Tabs = ({ value, onChange, options, tabProps: { className, ...tabProps }, children, ...props }) => {
  const isMobile = useSelector(isMobileSelector);
  const { t } = useTranslation();

  return (
    <TabsUI
      value={value}
      onChange={onChange}
      variant={isMobile ? "scrollable" : "fullWidth"}
      scrollButtons="on"
      {...props}
    >
      {children || Object.entries(options).map(([key, val]) => (
        <Tab
          label={t(`label:${val}`)}
          value={val}
          className={className || ""}
          key={key}
          {...tabProps}
        />
      ))}
    </TabsUI>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = { options: {}, tabProps: {} };
export default Tabs;
