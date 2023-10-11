export default async function translateToBangla(str) {
  const response = await fetch(
    `https://inputtools.google.com/request?text=${str}&itc=bn-t-i0-und&num=4&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
  ).then((res) => res.json());

  if (response[0] === "SUCCESS") {
    // Access the data from the response
    const data = response[1][0]; // This gets the first item from the response array
    console.log(data);
    const translate = data[1][0];
    return translate;
  }
}

// eng to bangla
// const response = await fetch(
//   `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&q=${str}&sl=en&tl=bn`
// );

// const data = await response.json();

// // Extract the translated text from the response data
// if (data && data[0] && data[0][0] && data[0][0][0]) {
//   const translatedText = data[0][0][0];
//   return translatedText;
// }
