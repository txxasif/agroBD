export function queryFixer(obj) {
  let str = "?";
  let count = 0;
  for (let val in obj) {
    if (obj[val].length && !count) {
      str += `${val}=${obj[val]}`;
      count++;
    } else if (obj[val].length && count) {
      str += `&${val}=${obj[val]}`;
    }
  }
  return str;
}
function splitStringFixer(str) {
  const strings = str.split(" ");
  if (strings.length === 1) return str;
  let finalString = "";
  for (let val of strings) {
    if (finalString.length) {
      finalString += `_${val}`;
    } else {
      finalString += val;
    }
  }
  return finalString;
}

export function queryFixerDriver(obj, obj1) {
  let str = "?";
  let count = 0;
  for (let val in obj) {
    if (obj[val].length && !count) {
      str += `${val}=${splitStringFixer(obj[val])}`;
      count++;
    } else if (obj[val].length && count) {
      str += `&${val}=${splitStringFixer(obj[val])}`;
    }
  }
  for (let val in obj1) {
    if (obj1[val].length && count) {
      str += `&${val}=${splitStringFixer(obj1[val])}`;
    }
  }
  return str;
}
