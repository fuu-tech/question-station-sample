import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


export const useTabs = (tabTypes, defaultTabType = Object.values(tabTypes)[0], disableAnchor = false) => {
  const history = useHistory();
  const location = useLocation();

  const extractDefaultTab = () => {
    const hashTabType = location.hash.substring(1);
    return Object.values(tabTypes).includes(hashTabType) ? hashTabType : defaultTabType;
  };

  const [tabType, setTabType] = useState(extractDefaultTab());

  const onChangeTab = (_, value, push = false) => {
    if (!disableAnchor) {
      const anchor = value ? `#${value}` : "";
      push ? history.push(location.pathname + anchor) : history.replace(location.pathname + anchor);
    }
    setTabType(value);
  };

  return [tabType, onChangeTab];
};
