export function banNewLine(value) {
  if (!value) return null;

  if (value.match(/\n/)) {
    return "改行を削除してください";
  }
  return null;
}

export function banSpace(value) {
  if (!value) return null;

  if (value.match(/ |　/)) { // eslint-disable-line no-irregular-whitespace
    return "空白を削除してください";
  }
  return null;
}
