export default async function translateToBangla(str) {
  const response = await fetch(
    `https://inputtools.google.com/request?text=${str}&itc=bn-t-i0-und&num=4&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
  ).then((res) => res.json());

  if (response[0] === "SUCCESS") {
    // Access the data from the response
    const data = response[1][0]; // This gets the first item from the response array
    console.log(data);
    let s = str.toString();
    const translate = s[0] == "2" ? data[1][2] : data[1][0];
    return translate;
  }
}

export function translateNumbers(str) {
  const bengaliDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
    ".": ".",
  };
  let translatedNumber = "";
  for (let val of str) {
    translatedNumber += bengaliDigits[val];
  }
  return translatedNumber;
}
