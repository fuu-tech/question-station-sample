import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MarkDown from '../atoms/MarkDown';
import Button from '../atoms/Button';
import InputFieldComponent from '../forms/InputFieldComponent';


const propTypes = {
  markDownValue: PropTypes.string,
};

const InputWithMarkDownPreview = ({ markDownValue, ...props }) => {
  const [isPreview, setIsPreview] = useState(false);
  const onClick = () => setIsPreview(!isPreview);

  return (
    <div className="input-with-mark-down-preview-container">
      <span className="input-box-top-button">
        <Button onClick={onClick}>
          {isPreview ? "編集へ" : "プレビューへ"}
        </Button>
      </span>
      {isPreview ? (
        <div className="input-with-mark-down-preview-box-wrapper">
          <div className="input-with-mark-down-preview-box">
            <MarkDown sentence={markDownValue || ""} />
          </div>
        </div>
      ) : <InputFieldComponent {...props} />}
    </div>
  );
};

InputWithMarkDownPreview.propTypes = propTypes;
export default InputWithMarkDownPreview;
