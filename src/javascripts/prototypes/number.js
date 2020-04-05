/* eslint-disable no-extend-native */

const shift = (num, precisionSrc, reverseShift) => {
  const precision = reverseShift ? -precisionSrc : precisionSrc;
  const numArray = ("" + num).split("e");
  return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
};

function round(precision) {
  return shift(Math.round(shift(this, precision, false)), precision, true);
}

Number.prototype.round = round;
