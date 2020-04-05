import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '../atoms/Button';
import InputFieldComponent from '../forms/InputFieldComponent';
import GleekLetterButtonList from './GleekLetterButtonList';
import BracketButtonList from './BracketButtonList';
import MathSymbolButtonList from './MathSymbolButtonList';
import BasicSymbolButtonList from './BasicSymbolButtonList';
import LimitSymbolButtonList from './LimitSymbolButtonList';

const propTypes = {
  change: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

class MarkDownInput extends React.Component {
  constructor(props) {
    super(props);
    this.area = createRef();
    this.nextCursolPos = null;
    this.state = { display: false };
  }

  componentDidUpdate() {
    if (this.nextCursolPos !== null) {
      const area = this.area.current;
      area.focus();
      area.setSelectionRange(this.nextCursolPos, this.nextCursolPos);
      this.nextCursolPos = null;
    }
  }

  decideNextCursolPos = (value) => {
    return value.substr(value.indexOf('{', 0)).length;
  }

  onClickAddToCurPreMidBracket = (e, decideNextCursolPos = this.decideNextCursolPos) => {
    const { input: { value } } = this.props;
    const cursolPos = this.area.current.selectionStart;
    const formerStr = value.substr(0, cursolPos);
    const latterStr = value.substr(cursolPos);
    let targetVal = e.currentTarget.value;
    if (formerStr.indexOf('$') !== -1 && latterStr.indexOf('$') !== -1) {
      targetVal = targetVal.replace(/[$]/g, '');
    }
    const nextCursolPos = decideNextCursolPos(targetVal, formerStr, latterStr);
    const newText = `${formerStr}${targetVal}${latterStr}`;
    this.change(newText);
    this.nextCursolPos = newText.length - latterStr.length - nextCursolPos + 1;
  }

  // onClickAddToCurPostMidBracket = (e) => {
  //   const { input: { value } } = this.props;
  //   const cursolPos = this.area.current.selectionStart;
  //   const formerStr = value.substr(0, cursolPos);
  //   const latterStr = value.substr(cursolPos);
  //   let Str = e.currentTarget.value;
  //   if (formerStr.indexOf('$') !== -1 && latterStr.indexOf('$') !== -1) {
  //     Str = e.currentTarget.value.replace(/[$]/g, '');
  //   }
  //   const nextCursolPos = Str.substr(Str.lastIndexOf('}')).length;
  //   const newText = `${formerStr}${Str}${latterStr}`;
  //   this.change(newText);
  //   this.nextCursolPos = newText.length - latterStr.length - nextCursolPos - 1;
  // }

  onClickIndentEq = () => {
    const { input: { value } } = this.props;
    const { selectionStart, selectionEnd } = this.area.current;
    const selectedValue = value.slice(selectionStart, selectionEnd);
    if (selectedValue.slice(0, 1) === "$" && selectedValue.slice(-1) === "$") {
      const formerStr = value.slice(0, selectionStart);
      const latterStr = value.slice(selectionEnd);
      this.change(`${formerStr}\n$${selectedValue}$\n${latterStr}`);
    }
  }

  onClickUnindentEq = () => {
    const { input: { value } } = this.props;
    const { selectionStart, selectionEnd } = this.area.current;
    const selectedValue = value.slice(selectionStart, selectionEnd);
    if (selectedValue.slice(0, 2) === "$$" && selectedValue.slice(-2) === "$$") {
      const formerStr = value.slice(0, selectionStart - 1);
      const latterStr = value.slice(selectionEnd + 1);
      const insertStr = selectedValue.slice(1, -1);
      this.change(formerStr + insertStr + latterStr);
    }
  }

  // onClickSerchEq = () => {
  //   const { input: { value } } = this.props;
  //   const area = this.area.current;
  //   let Pos1;
  //   let Pos2;
  //   let startPosFlag;
  //   if (area.selectionStart === area.selectionEnd) {
  //     Pos1 = value.indexOf('$', 0);
  //     startPosFlag = value.match(/\$+/);
  //   } else {
  //     Pos1 = value.indexOf('$', this.area.current.selectionEnd);
  //     startPosFlag = value.slice(this.area.current.selectionEnd).match(/\$+/);
  //   }
  //   if (startPosFlag[0] === '$') {
  //     Pos2 = value.indexOf('$', Pos1 + 1) + 1;
  //   } else {
  //     Pos2 = value.indexOf('$$', Pos1 + 1) + 2;
  //   }
  //   this.area.current.focus();
  //   this.area.current.setSelectionRange(Pos1, Pos2);
  // }

  // MovePreBracket = () => {
  //   const { input: { value } } = this.props;
  //   const cursolPos = this.area.current.selectionStart;
  //   const nextCursolPos = value.lastIndexOf('{}', cursolPos - 2);
  //   const area = this.area.current;
  //   area.focus();
  //   if (nextCursolPos !== -1) {
  //     area.setSelectionRange(nextCursolPos + 1, nextCursolPos + 1);
  //   } else {
  //     area.setSelectionRange(cursolPos, cursolPos);
  //   }
  // }

  // MovePostBracket = () => {
  //   const { input: { value } } = this.props;
  //   const cursolPos = this.area.current.selectionStart;
  //   const nextCursolPos = value.indexOf('{}', cursolPos);
  //   const area = this.area.current;
  //   area.focus();
  //   if (nextCursolPos !== -1) {
  //     area.setSelectionRange(nextCursolPos + 1, nextCursolPos + 1);
  //   } else {
  //     area.setSelectionRange(cursolPos, cursolPos);
  //   }
  // }

  openMenu = () => {
    this.setState((state) => {
      return { display: !state.display };
    });
  }

  change = (value) => {
    const { input: { name }, change } = this.props;
    change(name, value);
  }

  render() {
    const { change, ...props } = this.props;
    const { display } = this.state;

    return (
      <div>
        <div>
          <ButtonGroup>
            <Button onClick={this.openMenu} endIcon={display ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
              数式入力補助
            </Button>
          </ButtonGroup>
        </div>
        {display && (
          <>
            <ButtonGroup>
              <Button value="${}$" onClick={this.onClickAddToCurPreMidBracket}>数式を開始</Button>
              <Button onClick={this.onClickIndentEq}>非インライン化</Button>
              <Button onClick={this.onClickUnindentEq}>インライン化</Button>
            </ButtonGroup>
            <BasicSymbolButtonList onClick={this.onClickAddToCurPreMidBracket} />
            <MathSymbolButtonList onClick={this.onClickAddToCurPreMidBracket} />
            <BracketButtonList onClick={this.onClickAddToCurPreMidBracket} />
            <LimitSymbolButtonList onClick={this.onClickAddToCurPreMidBracket} />
            <GleekLetterButtonList onClick={this.onClickAddToCurPreMidBracket} />
          </>
        )}
        <InputFieldComponent
          multiline
          inputRef={this.area}
          {...props}
        />
      </div>
    );
  }
}

MarkDownInput.propTypes = propTypes;
export default MarkDownInput;
