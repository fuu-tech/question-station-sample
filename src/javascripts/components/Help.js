/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HelpOutline from '@material-ui/icons/HelpOutline';
import KeyboardReturnSharpIcon from '@material-ui/icons/KeyboardReturnSharp';

import FixedIconButton from './atoms/FixedIconButton';
import MenuList from './molecules/MenuList';
import PageExplanation from './molecules/PageExplanation';
import Tabs from './molecules/Tabs';
import MarkDown from './atoms/MarkDown';
import { useTabs } from '../hooks/useTabs';
import { helpTypes } from '../constants/helpTypes';
import { topText } from '../constants/markdownText/help/top';
import { contentsText } from '../constants/markdownText/help/contents';
import { markdownText } from '../constants/markdownText/help/markdown';
import { profileText } from '../constants/markdownText/help/profile';
import { privacypolicyText } from '../constants/markdownText/help/privacypolicy';
import { termOfServiceText } from '../constants/markdownText/help/termOfService';


const sentenceObj = {
  [helpTypes.top]: topText,
  [helpTypes.aboutContents]: contentsText,
  [helpTypes.aboutMarkdown]: markdownText,
  [helpTypes.aboutProfile]: profileText,
  [helpTypes.privacypolicy]: privacypolicyText,
  [helpTypes.termOfService]: termOfServiceText,
};

const isMobileSelector = state => state.options.get('isMobile');

const Help = () => {
  const defaultTabType = helpTypes.top;
  const isMobile = useSelector(isMobileSelector);
  const location = useLocation();
  const [tabType, onChange] = useTabs(helpTypes, isMobile ? null : defaultTabType);

  useEffect(() => {
    if (!isMobile && !tabType) onChange(null, defaultTabType);
  }, [isMobile]);

  useEffect(() => {
    const hashTabType = location.hash.substring(1);
    if (isMobile && tabType !== hashTabType) {
      onChange(null, hashTabType);
    }
  }, [location.hash, isMobile]);

  const sentence = sentenceObj[tabType];
  let content = "";
  if (isMobile) {
    const onClickReturn = () => onChange(null, null);
    const onClickTab = (e, val) => onChange(e, val, true);
    content = tabType ? (
      <>
        <div className="help-content-container">
          <MarkDown sentence={sentence} />
        </div>
        <FixedIconButton onClick={onClickReturn}>
          <KeyboardReturnSharpIcon />
        </FixedIconButton>
      </>
    ) : (
      <MenuList
        onChange={onClickTab}
        options={helpTypes}
      />
    );
  } else {
    content = (
      <div className="help-container">
        <div className="help-list-container">
          <Tabs
            value={tabType || defaultTabType}
            onChange={onChange}
            options={helpTypes}
            orientation="vertical"
          />
        </div>
        <div className="help-content-container">
          <MarkDown sentence={sentence} />
        </div>
      </div>
    );
  }

  return (
    <div className="help-body">
      <PageExplanation
        Icon={HelpOutline}
        title="ヘルプ"
        explanation=""
      />
      {content}
    </div>
  );
};

export default Help;
