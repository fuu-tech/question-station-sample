import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import MenuListUI from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
  itemProps: PropTypes.shape({}),
};

const MenuList = ({ onChange, options, itemProps, children, ...props }) => {
  const { t } = useTranslation();

  return (
    <MenuListUI
      open
      disablePadding
      {...props}
    >
      {children || Object.entries(options).map(([key, value]) => (
        <MenuItem
          onClick={e => onChange(e, value)}
          value={value}
          key={key}
          style={{
            display: "flex",
            padding: "8px",
          }}
          {...itemProps}
        >
          {t(`label:${value}`)}
        </MenuItem>
      ))}
    </MenuListUI>
  );
};

MenuList.propTypes = propTypes;
MenuList.defaultProps = { options: {}, itemProps: {} };
export default MenuList;
