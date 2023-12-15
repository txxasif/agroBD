export default function queryFixer(obj) {
  let str = "?";
  let count = 0;
  for (let val in obj) {
    console.log(obj[val], typeof obj[val]);
    if (obj[val].length && !count) {
      str += `${val}=${obj[val]}`;
      count++;
    } else if (obj[val].length && count) {
      str += `&${val}=${obj[val]}`;
    }
  }
  return str;
}
