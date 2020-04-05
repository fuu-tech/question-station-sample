/* eslint-disable no-extend-native */

import { List } from 'immutable';

function arrayUniq(key = null) {
  return this.reduce((arr, val) => {
    const isAlreadyExist = arr.some((pushedVal) => {
      return key ? (pushedVal[key] === val[key]) : (pushedVal === val);
    });
    if (!isAlreadyExist) arr.push(val);
    return arr;
  }, []);
}

function listUniq(key = null) {
  return new List(this.reduce((arr, val) => {
    const isAlreadyExist = arr.some((pushedVal) => {
      return key ? (pushedVal[key] === val[key]) : (pushedVal === val);
    });
    if (!isAlreadyExist) arr.push(val);
    return arr;
  }, []));
}

Array.prototype.uniq = arrayUniq;
List.prototype.uniq = listUniq;


function arrayCompact(key = null) {
  return this.filter((val) => { return key ? val[key] : val; });
}

function listCompact(key = null) {
  return new List(this.filter((val) => { return key ? val[key] : val; }));
}

Array.prototype.compact = arrayCompact;
List.prototype.compact = listCompact;
