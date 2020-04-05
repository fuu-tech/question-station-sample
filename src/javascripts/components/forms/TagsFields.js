import PropTypes from 'prop-types';
import React from 'react';

import Button from '../atoms/Button';
import FieldWithDeleteButton from './FieldWithDeleteButton';
import InputFieldComponent from './InputFieldComponent';
import { banNewLine, banSpace } from '../../validators/strValidator';


const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  fields: PropTypes.shape({
    length: PropTypes.number.isRequired,
    push: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  change: PropTypes.func.isRequired,
};

class TagsFields extends React.Component {
  onClickTagSuggest = (_, tagValue, name) => {
    if (tagValue) {
      this.props.change(name, tagValue);
    }
  }

  render() {
    const { fields, max, min, onChange } = this.props;

    return (
      <div>
        {fields.map((tag, index) => {
          return (
            <FieldWithDeleteButton
              onClickDelete={() => {
                fields.remove(index);
                onChange();
              }}
              disableDelete={min && fields.length <= min}
              name={`${tag}.value`}
              maxLength="20"
              component={InputFieldComponent}
              onChange={onChange}
              validate={[banNewLine, banSpace]}
              key={tag}
            />
          );
        })}
        {!max || fields.length < max ? (
          <Button
            type="button"
            onClick={() => {
              fields.push({});
              onChange();
            }}
          >
            追加
          </Button>
        ) : ""}
      </div>
    );
  }
}

TagsFields.propTypes = propTypes;
TagsFields.defaultProps = { onChange: () => {} };
export default TagsFields;
